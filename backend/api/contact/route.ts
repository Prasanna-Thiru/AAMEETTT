import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/backend/lib/auth";
import { pushToGoogleSheets } from "@/backend/lib/googleSheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, enquiryType, message } = body;
    if (!name || !email || !phone || !enquiryType || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }
    
    pushToGoogleSheets("Contact", { name, email, phone, enquiryType, message }).catch(console.error);
    
    return NextResponse.json({ success: true, data: { id: "sheet-only-" + Date.now() }, message: "Enquiry submitted." }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    requireAdminAuth(req);
    return NextResponse.json({ success: true, data: [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: err.message?.includes("Unauthorized") ? 401 : 500 });
  }
}
