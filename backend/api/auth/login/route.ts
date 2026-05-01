import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { signToken } from "@/backend/lib/auth";
import AdminUser from "@/database/models/AdminUser";

export async function POST(req: NextRequest) {
  let email = "";

  try {
    await connectDB();
    const body = await req.json();
    email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
    }

    const user = await AdminUser.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
    }

    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });

    const res = NextResponse.json({
      success: true,
      data: { name: user.name, email: user.email, role: user.role },
    });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("❌ Admin login error:", {
      message: err.message || err,
      email,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
