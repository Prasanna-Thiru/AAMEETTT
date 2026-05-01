import { NextRequest, NextResponse } from "next/server";
import { getAnyTokenFromRequest, verifyToken } from "@/backend/lib/auth";
import { pushToGoogleSheets } from "@/backend/lib/googleSheets";

async function getAuthenticatedUser(req: NextRequest) {
  const token = getAnyTokenFromRequest(req);
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    // Return minimal interface without querying DB
    return { _id: payload.id, role: payload.role, email: "", name: "" }; 
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authUser = await getAuthenticatedUser(req);

    const email = String(body.email || authUser?.email || "").toLowerCase().trim();
    const name = String(body.name || authUser?.name || "").trim();
    const role = String(body.role || "").trim() || undefined;
    const source = String(body.source || "login-prompt").trim();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required to subscribe." },
        { status: 400 }
      );
    }

    pushToGoogleSheets("Newsletter", { email, name, role, source }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing. We’ll keep you updated with school news and events.",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Unable to process your newsletter preference right now." },
      { status: 500 }
    );
  }
}
