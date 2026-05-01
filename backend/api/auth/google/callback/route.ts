import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { signToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";
import { isStudentEmailAllowed } from "@/backend/lib/studentAccess";
import { getAppBaseUrl, getGoogleRedirectUri } from "@/backend/lib/google-oauth";

type UserRole = "student" | "parent" | "faculty";
type GoogleIntent = "login";

const REDIRECT_MAP: Record<UserRole, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  faculty: "/faculty/dashboard",
};

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

function redirectWithClearedState(url: URL) {
  const res = NextResponse.redirect(url);
  res.cookies.delete("google_oauth_state");
  return res;
}

function decodeState(state: string | null): { role: UserRole; intent: GoogleIntent; nonce: string } | null {
  if (!state) return null;

  try {
    const parsed = JSON.parse(Buffer.from(state, "base64url").toString("utf8"));

    if (
      ["student", "parent", "faculty"].includes(parsed.role) &&
      parsed.intent === "login" &&
      typeof parsed.nonce === "string" &&
      parsed.nonce.length > 0
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
  const baseUrl = getAppBaseUrl(req);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google-config", baseUrl));
  }

  const code = req.nextUrl.searchParams.get("code");
  const decodedState = decodeState(req.nextUrl.searchParams.get("state"));

  if (!code || !decodedState) {
    return NextResponse.redirect(new URL("/login?error=google-callback", baseUrl));
  }

  if (req.cookies.get("google_oauth_state")?.value !== decodedState.nonce) {
    const res = NextResponse.redirect(new URL("/login?error=google-state", baseUrl));
    res.cookies.delete("google_oauth_state");
    return res;
  }

  try {
    const redirectUri = getGoogleRedirectUri(req);
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

    if (!tokenResponse.ok) return redirectWithClearedState(new URL("/login?error=google-token", baseUrl));

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token as string | undefined;

    if (!accessToken) return redirectWithClearedState(new URL("/login?error=google-token", baseUrl));

    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!profileResponse.ok) return redirectWithClearedState(new URL("/login?error=google-profile", baseUrl));

    const profile = await profileResponse.json();
    const email = String(profile.email || "").toLowerCase().trim();
    const name = String(profile.name || "").trim();

    if (!email) return redirectWithClearedState(new URL("/login?error=google-profile", baseUrl));

    try {
      await connectDB();
    } catch (err: any) {
      console.error("Google OAuth database connection failed:", err?.message || err);
      return redirectWithClearedState(new URL("/login?error=google-database", baseUrl));
    }

    if (decodedState.role === "student" && !(await isStudentEmailAllowed(email))) {
      const deniedUrl = new URL("/login", baseUrl);
      deniedUrl.searchParams.set("role", "student");
      deniedUrl.searchParams.set("error", "student-not-approved");
      return redirectWithClearedState(deniedUrl);
    }

    const user = await findUser(decodedState.role, email);

    if (user) {
      let token: string;

      try {
        token = signToken({
          id: user._id.toString(),
          email,
          role: decodedState.role,
        });
      } catch (err) {
        console.error("Google OAuth session creation failed:", err);
        return redirectWithClearedState(new URL("/login?error=google-session", baseUrl));
      }

      const res = NextResponse.redirect(new URL(REDIRECT_MAP[decodedState.role], baseUrl));
      res.cookies.delete("google_oauth_state");
      setLoginCookies(res, token);
      return res;
    }

    const noAccountUrl = new URL("/login", baseUrl);
    noAccountUrl.searchParams.set("mode", "login");
    noAccountUrl.searchParams.set("role", decodedState.role);
    noAccountUrl.searchParams.set("error", "google-no-account");

    return redirectWithClearedState(noAccountUrl);
  } catch (err) {
    console.error("❌ Google OAuth callback failed:", {
      message: err instanceof Error ? err.message : err,
      code: (err as any)?.code,
      timestamp: new Date().toISOString(),
    });
    return redirectWithClearedState(new URL("/login?error=google-unavailable", baseUrl));
  }
}
