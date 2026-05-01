import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import GalleryItem from "@/database/models/GalleryItem";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdminAuth(req);
    await connectDB();
    await GalleryItem.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
