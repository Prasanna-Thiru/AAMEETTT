import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import ContactEnquiry from "@/database/models/ContactEnquiry";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    const { status } = await req.json();
    const doc = await ContactEnquiry.findByIdAndUpdate(params.id, { status }, { new: true });
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
    await ContactEnquiry.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
