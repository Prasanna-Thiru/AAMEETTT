import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import FacultyLogin from "@/database/models/FacultyLogin";
import PasswordResetToken from "@/database/models/PasswordResetToken";
import { sendPasswordResetEmail } from "@/backend/lib/email";

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
    const email = String(body.email || "").toLowerCase().trim();

    if (!["student", "parent", "faculty"].includes(role) || !email) {
      return NextResponse.json(
        { success: false, error: "Role and email are required to reset your password." },
        { status: 400 }
      );
    }

    const user = await findUser(role, email);

    if (user) {
      await PasswordResetToken.deleteMany({ email, role });

      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await PasswordResetToken.create({ email, role, tokenHash, expiresAt });

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
      const resetUrl = `${baseUrl}/login?mode=reset&role=${role}&token=${rawToken}`;

      sendPasswordResetEmail(user.email, user.name || "there", resetUrl).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: "If that account exists, a reset link has been sent to the email address provided.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}
