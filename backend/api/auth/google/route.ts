import { NextRequest, NextResponse } from "next/server";
import { getAppBaseUrl, getGoogleRedirectUri } from "@/backend/lib/google-oauth";

type UserRole = "student" | "parent" | "faculty";
type GoogleIntent = "login";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = getAppBaseUrl(req);

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google-config", baseUrl));
  }

  const role = (req.nextUrl.searchParams.get("role") || "student") as UserRole;
  const intent = (req.nextUrl.searchParams.get("intent") || "login") as GoogleIntent;

  if (!["student", "parent", "faculty"].includes(role) || intent !== "login") {
    return NextResponse.redirect(new URL("/login?error=google-invalid-request", baseUrl));
  }

  const nonce = crypto.randomUUID();
  const state = Buffer.from(JSON.stringify({ role, intent, nonce })).toString("base64url");
  const redirectUri = getGoogleRedirectUri(req);

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("prompt", "select_account");
  googleUrl.searchParams.set("access_type", "online");
  googleUrl.searchParams.set("include_granted_scopes", "true");
  googleUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(googleUrl);
  res.cookies.set("google_oauth_state", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return res;
}
