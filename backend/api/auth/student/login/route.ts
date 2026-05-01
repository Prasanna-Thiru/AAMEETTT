import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { signToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import { isStudentEmailAllowed } from "@/backend/lib/studentAccess";
import { AUTH_CONFIG } from "@/backend/lib/auth-config";

export async function POST(req: NextRequest) {
  let email = "";

  try {
    await connectDB();
    const body = await req.json();
    email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!(await isStudentEmailAllowed(email))) {
      return NextResponse.json(
        { success: false, error: "This student email is not approved for portal access yet. Please contact the school office." },
        { status: 403 }
      );
    }

    const user = await Student.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      role: "student",
    });

    const res = NextResponse.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: "student",
        rollNumber: user.rollNumber,
        class: user.class,
      },
    });

    res.cookies.set(AUTH_CONFIG.COOKIES.AUTH_TOKEN.name, token, AUTH_CONFIG.COOKIES.AUTH_TOKEN.config);
    res.cookies.set(AUTH_CONFIG.COOKIES.NEWSLETTER_PROMPT.name, "1", AUTH_CONFIG.COOKIES.NEWSLETTER_PROMPT.config);

    return res;
  } catch (err: any) {
    console.error("❌ Student login error:", {
      message: err.message || err,
      email,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
