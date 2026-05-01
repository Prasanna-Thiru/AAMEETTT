import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { getUserTokenFromRequest, verifyToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";

type PortalRole = "student" | "parent" | "faculty";

async function findUser(role: PortalRole, id: string) {
  switch (role) {
    case "student":
      return Student.findById(id);
    case "parent":
      return Parent.findById(id);
    case "faculty":
      return FacultyLogin.findById(id);
    default:
      return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getUserTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ success: false, error: "Please sign in first." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!["student", "parent", "faculty"].includes(payload.role)) {
      return NextResponse.json({ success: false, error: "Only portal users can change passwords here." }, { status: 403 });
    }

    const body = await req.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Current password and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, error: "New password must be at least 8 characters." }, { status: 400 });
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ success: false, error: "New password must be different from current password." }, { status: 400 });
    }

    await connectDB();
    const user = await findUser(payload.role as PortalRole, payload.id);

    if (!user || !(await user.comparePassword(currentPassword))) {
      return NextResponse.json({ success: false, error: "Current password is incorrect." }, { status: 401 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Unable to change password right now." }, { status: 500 });
  }
}
