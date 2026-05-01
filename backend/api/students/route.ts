import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { getAnyTokenFromRequest, verifyToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";

export async function GET(req: NextRequest) {
  try {
    const token = getAnyTokenFromRequest(req);
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    if (!["faculty", "superadmin", "editor"].includes(payload.role)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const className = req.nextUrl.searchParams.get("className")?.trim();
    const query = className ? { class: className } : {};
    const students = await Student.find(query).select("name email rollNumber class").sort({ class: 1, rollNumber: 1 }).lean();
    return NextResponse.json({ success: true, data: students });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Unable to load students." }, { status: 500 });
  }
}
