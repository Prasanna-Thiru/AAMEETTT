import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import AdmissionLead from "@/database/models/AdmissionLead";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    const { status } = await req.json();
    const lead = await AdmissionLead.findByIdAndUpdate(params.id, { status }, { new: true });
    if (!lead) return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ success: true, data: lead });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    await AdmissionLead.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
