import { NextRequest, NextResponse } from "next/server";

type UserRole = "student" | "parent" | "faculty";
type GoogleIntent = "login" | "signup";

function getBaseUrl(req: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = getBaseUrl(req);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google-config", baseUrl));
  }

  const role = (req.nextUrl.searchParams.get("role") || "student") as UserRole;
  const intent = (req.nextUrl.searchParams.get("intent") || "login") as GoogleIntent;

  if (!["student", "parent", "faculty"].includes(role) || !["login", "signup"].includes(intent)) {
    return NextResponse.redirect(new URL("/login?error=google-invalid-request", baseUrl));
  }

  const state = Buffer.from(JSON.stringify({ role, intent })).toString("base64url");
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("prompt", "select_account");
  googleUrl.searchParams.set("state", state);

  return NextResponse.redirect(googleUrl);
}
