import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function getAdminTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  return req.cookies.get("admin_token")?.value ?? null;
}

export function getUserTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  return req.cookies.get("auth_token")?.value ?? null;
}

export function getAnyTokenFromRequest(req: NextRequest): string | null {
  return getUserTokenFromRequest(req) ?? getAdminTokenFromRequest(req);
}

export function requireAdminAuth(req: NextRequest): JWTPayload {
  const token = getAdminTokenFromRequest(req);
  if (!token) throw new Error("Unauthorized: No token provided");
  const payload = verifyToken(token);

  if (!["superadmin", "editor"].includes(payload.role)) {
    throw new Error("Unauthorized: Admin access required");
  }

  return payload;
}
