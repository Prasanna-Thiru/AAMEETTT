import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import Faculty from "@/database/models/Faculty";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    const body = await req.json();
    const doc = await Faculty.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!doc) return NextResponse.json({ success: false, error: "Not found." }, { status: 404 });
    return NextResponse.json({ success: true, data: doc });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    await Faculty.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
