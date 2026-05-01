import { NextRequest } from "next/server";

export const GOOGLE_OAUTH_CALLBACK_PATH = "/api/auth/google/callback";

export function getAppBaseUrl(req: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

export function getGoogleRedirectUri(req: NextRequest) {
  const configuredRedirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI?.trim();

  if (configuredRedirectUri) {
    return configuredRedirectUri;
  }

  return `${getAppBaseUrl(req)}${GOOGLE_OAUTH_CALLBACK_PATH}`;
}
