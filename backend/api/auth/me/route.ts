import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getAnyTokenFromRequest } from "@/backend/lib/auth";
import { connectDB } from "@/database/lib/db";
import AdminUser from "@/database/models/AdminUser";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";

export async function GET(req: NextRequest) {
  try {
    const token = getAnyTokenFromRequest(req);
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    await connectDB();

    let user = null;

    switch (payload.role) {
      case "superadmin":
      case "editor":
        user = await AdminUser.findById(payload.id).select("-password").lean();
        break;
      case "student":
        user = await Student.findById(payload.id).select("-password").lean();
        break;
      case "parent":
        user = await Parent.findById(payload.id).select("-password").lean();
        break;
      case "faculty":
        user = await FacultyLogin.findById(payload.id).select("-password").lean();
        break;
      default:
        return NextResponse.json(
          { success: false, error: "Invalid role" },
          { status: 400 }
        );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        role: payload.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
