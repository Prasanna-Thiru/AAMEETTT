import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { verifyToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import Faculty from "@/database/models/Faculty";
import FacultyLogin from "@/database/models/FacultyLogin";
import StudentAccess from "@/database/models/StudentAccess";

type UserRole = "student" | "parent" | "faculty";

function normalizeChildrenNames(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Check if the requester is an admin (optional, assuming admin_token cookie is checked by middleware or here)
    const adminToken = req.cookies.get("admin_token")?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const decodedAdmin = verifyToken(adminToken);
    if (!decodedAdmin || decodedAdmin.role !== "superadmin" && decodedAdmin.role !== "editor") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const role = body.role as UserRole;
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const name = String(body.name || "").trim();

    if (!["student", "parent", "faculty"].includes(role)) {
      return NextResponse.json({ success: false, error: "Please choose a valid account type." }, { status: 400 });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: "Password must be at least 8 characters." }, { status: 400 });
    }

    if (role === "student") {
      const rollNumber = String(body.rollNumber || "").trim();
      const className = String(body.className || body.class || "").trim();
      const parentEmail = body.parentEmail ? String(body.parentEmail).toLowerCase().trim() : "";
      const phone = body.phone ? String(body.phone).trim() : "";

      if (!rollNumber || !className) {
        return NextResponse.json({ success: false, error: "Roll number and class are required for student." }, { status: 400 });
      }

      const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] }).lean();
      if (existingStudent) {
        return NextResponse.json({ success: false, error: "A student with that email or roll number already exists." }, { status: 409 });
      }

      const user = await Student.create({ email, password, name, rollNumber, class: className, parentEmail, phone });
      await StudentAccess.updateOne(
        { email },
        {
          $setOnInsert: {
            createdBy: decodedAdmin.id,
            createdByEmail: decodedAdmin.email,
            note: "Approved while creating student account.",
          },
          $set: { usedAt: new Date() },
        },
        { upsert: true }
      );
      return NextResponse.json({ success: true, data: { name: user.name, email: user.email, role } }, { status: 201 });
    }

    if (role === "parent") {
      const phone = String(body.phone || "").trim();
      const childrenNames = normalizeChildrenNames(body.childrenNames);

      if (!phone) {
        return NextResponse.json({ success: false, error: "Phone number is required for parent." }, { status: 400 });
      }

      const existingParent = await Parent.findOne({ email }).lean();
      if (existingParent) {
        return NextResponse.json({ success: false, error: "A parent account with that email already exists." }, { status: 409 });
      }

      const user = await Parent.create({ email, password, name, phone, childrenNames });
      return NextResponse.json({ success: true, data: { name: user.name, email: user.email, role } }, { status: 201 });
    }

    const designation = String(body.designation || "").trim();
    const subject = String(body.subject || "").trim();
    const qualification = String(body.qualification || "").trim();
    const experience = String(body.experience || "").trim();
    const bio = body.bio ? String(body.bio).trim() : "";
    const imageUrl = body.imageUrl ? String(body.imageUrl).trim() : "";

    if (!designation || !subject || !qualification || !experience) {
      return NextResponse.json({ success: false, error: "Faculty needs designation, subject, qualification, and experience." }, { status: 400 });
    }

    const existingFaculty = await FacultyLogin.findOne({ email }).lean();
    if (existingFaculty) {
      return NextResponse.json({ success: false, error: "A faculty account with that email already exists." }, { status: 409 });
    }

    const facultyProfile = await Faculty.create({ name, designation, subject, qualification, experience, bio, imageUrl });
    const user = await FacultyLogin.create({ facultyId: facultyProfile._id, email, password, name, designation });

    return NextResponse.json({ success: true, data: { name: user.name, email: user.email, role } }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Failed to create user." }, { status: 500 });
  }
}
