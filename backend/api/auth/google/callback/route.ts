import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { signToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";

type UserRole = "student" | "parent" | "faculty";
type GoogleIntent = "login" | "signup";

const REDIRECT_MAP: Record<UserRole, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  faculty: "/faculty/dashboard",
};

function getBaseUrl(req: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

function setLoginCookies(res: NextResponse, token: string) {
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.cookies.set("newsletter_prompt", "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });
}

function decodeState(state: string | null): { role: UserRole; intent: GoogleIntent } | null {
  if (!state) return null;

  try {
    const parsed = JSON.parse(Buffer.from(state, "base64url").toString("utf8"));

    if (
      ["student", "parent", "faculty"].includes(parsed.role) &&
      ["login", "signup"].includes(parsed.intent)
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

async function findUser(role: UserRole, email: string) {
  switch (role) {
    case "student":
      return Student.findOne({ email });
    case "parent":
      return Parent.findOne({ email });
    case "faculty":
      return FacultyLogin.findOne({ email });
    default:
      return null;
  }
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = getBaseUrl(req);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google-config", baseUrl));
  }

  const code = req.nextUrl.searchParams.get("code");
  const decodedState = decodeState(req.nextUrl.searchParams.get("state"));

  if (!code || !decodedState) {
    return NextResponse.redirect(new URL("/login?error=google-callback", baseUrl));
  }

  try {
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/login?error=google-token", baseUrl));
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token as string | undefined;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login?error=google-token", baseUrl));
    }

    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!profileResponse.ok) {
      return NextResponse.redirect(new URL("/login?error=google-profile", baseUrl));
    }

    const profile = await profileResponse.json();
    const email = String(profile.email || "").toLowerCase().trim();
    const name = String(profile.name || "").trim();

    if (!email) {
      return NextResponse.redirect(new URL("/login?error=google-profile", baseUrl));
    }

    await connectDB();
    const user = await findUser(decodedState.role, email);

    if (user) {
      const token = signToken({
        id: user._id.toString(),
        email,
        role: decodedState.role,
      });

      const res = NextResponse.redirect(new URL(REDIRECT_MAP[decodedState.role], baseUrl));
      setLoginCookies(res, token);
      return res;
    }

    const signupUrl = new URL("/login", baseUrl);
    signupUrl.searchParams.set("mode", "signup");
    signupUrl.searchParams.set("role", decodedState.role);
    signupUrl.searchParams.set("provider", "google");
    signupUrl.searchParams.set("email", email);
    signupUrl.searchParams.set("name", name);
    signupUrl.searchParams.set(
      "notice",
      decodedState.intent === "login" ? "google-no-account" : "google-prefill"
    );

    return NextResponse.redirect(signupUrl);
  } catch {
    return NextResponse.redirect(new URL("/login?error=google-unavailable", baseUrl));
  }
}
