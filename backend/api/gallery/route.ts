import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { requireAdminAuth } from "@/backend/lib/auth";
import GalleryItem from "@/database/models/GalleryItem";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filter = category && category !== "All" ? { category } : {};
    const items = await GalleryItem.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: items });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdminAuth(req);
    await connectDB();
    const body = await req.json();
    const item = await GalleryItem.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
