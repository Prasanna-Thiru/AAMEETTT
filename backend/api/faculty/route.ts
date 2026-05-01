import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import Faculty from "@/database/models/Faculty";

export async function GET() {
  try {
    await connectDB();
    const faculty = await Faculty.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: faculty });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdminAuth(req);
    await connectDB();
    const body = await req.json();
    const member = await Faculty.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
