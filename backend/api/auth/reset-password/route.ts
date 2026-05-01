import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";
import PasswordResetToken from "@/database/models/PasswordResetToken";

type UserRole = "student" | "parent" | "faculty";

async function findUser(role: UserRole, email: string) {
  switch (role) {
    case "student":
      return Student.findOne({ email });
    case "parent":
      return Parent.findOne({ email });
    case "faculty":
      return FacultyLogin.findOne({ email });
    default:
      return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const role = body.role as UserRole;
    const token = String(body.token || "").trim();
    const password = String(body.password || "");

    if (!["student", "parent", "faculty"].includes(role) || !token || !password) {
      return NextResponse.json(
        { success: false, error: "Role, token, and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetRecord = await PasswordResetToken.findOne({
      role,
      tokenHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { success: false, error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const user = await findUser(role, resetRecord.email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "The account linked to this reset request was not found." },
        { status: 404 }
      );
    }

    user.password = password;
    await user.save();

    resetRecord.usedAt = new Date();
    await resetRecord.save();

    return NextResponse.json({
      success: true,
      message: "Your password has been updated. You can now sign in with your new password.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Unable to reset password right now." },
      { status: 500 }
    );
  }
}
