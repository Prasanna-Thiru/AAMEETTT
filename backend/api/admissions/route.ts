import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/backend/lib/auth";
import { pushToGoogleSheets } from "@/backend/lib/googleSheets";

// POST /api/admissions — public: submit application
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, studentName, classApplying, schoolingType, contactNumber, email, message } = body;

    if (!parentName || !studentName || !classApplying || !schoolingType || !contactNumber || !email) {
      return NextResponse.json({ success: false, error: "All required fields must be filled." }, { status: 400 });
    }

    // Google Sheets integration — don't block response
    pushToGoogleSheets("Admissions", { parentName, studentName, classApplying, schoolingType, contactNumber, email, message }).catch(console.error);

    return NextResponse.json({ success: true, data: { id: "sheet-only-" + Date.now() }, message: "Application submitted successfully." }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error. Please try again." }, { status: 500 });
  }
}

// GET /api/admissions — protected: admin list
export async function GET(req: NextRequest) {
  try {
    requireAdminAuth(req);
    // Since we're using Google Sheets exclusively, return an empty array to prevent dashboard crashes
    return NextResponse.json({ success: true, data: [] });
  } catch (err: any) {
    const status = err.message?.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}
