import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { signToken } from "@/backend/lib/auth";
import Student from "@/database/models/Student";
import Parent from "@/database/models/Parent";
import Faculty from "@/database/models/Faculty";
import FacultyLogin from "@/database/models/FacultyLogin";
import { isStudentEmailAllowed, markStudentEmailUsed } from "@/backend/lib/studentAccess";

type UserRole = "student" | "parent" | "faculty";

const REDIRECT_MAP: Record<UserRole, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  faculty: "/faculty/dashboard",
};

function setLoginCookies(res: NextResponse, token: string) {
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.cookies.set("newsletter_prompt", "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });
}

function normalizeChildrenNames(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
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

      if (!(await isStudentEmailAllowed(email))) {
        return NextResponse.json(
          { success: false, error: "This student email is not approved for portal access yet. Please contact the school office." },
          { status: 403 }
        );
      }

      if (!rollNumber || !className) {
        return NextResponse.json(
          { success: false, error: "Roll number and class are required for student signup." },
          { status: 400 }
        );
      }

      const existingStudent = await Student.findOne({
        $or: [{ email }, { rollNumber }],
      }).lean();

      if (existingStudent) {
        return NextResponse.json(
          { success: false, error: "A student account with that email or roll number already exists." },
          { status: 409 }
        );
      }

      const user = await Student.create({
        email,
        password,
        name,
        rollNumber,
        class: className,
        parentEmail,
        phone,
      });
      await markStudentEmailUsed(email);

      const token = signToken({ id: user._id.toString(), email: user.email, role });
      const res = NextResponse.json(
        {
          success: true,
          data: {
            name: user.name,
            email: user.email,
            role,
            rollNumber: user.rollNumber,
            class: user.class,
          },
          redirectTo: REDIRECT_MAP[role],
        },
        { status: 201 }
      );

      setLoginCookies(res, token);
      return res;
    }

    if (role === "parent") {
      const phone = String(body.phone || "").trim();
      const childrenNames = normalizeChildrenNames(body.childrenNames);

      if (!phone) {
        return NextResponse.json(
          { success: false, error: "Phone number is required for parent signup." },
          { status: 400 }
        );
      }

      const existingParent = await Parent.findOne({ email }).lean();
      if (existingParent) {
        return NextResponse.json(
          { success: false, error: "A parent account with that email already exists." },
          { status: 409 }
        );
      }

      const user = await Parent.create({
        email,
        password,
        name,
        phone,
        childrenNames,
      });

      const token = signToken({ id: user._id.toString(), email: user.email, role });
      const res = NextResponse.json(
        {
          success: true,
          data: {
            name: user.name,
            email: user.email,
            role,
            phone: user.phone,
            childrenNames: user.childrenNames,
          },
          redirectTo: REDIRECT_MAP[role],
        },
        { status: 201 }
      );

      setLoginCookies(res, token);
      return res;
    }

    const designation = String(body.designation || "").trim();
    const subject = String(body.subject || "").trim();
    const qualification = String(body.qualification || "").trim();
    const experience = String(body.experience || "").trim();
    const bio = body.bio ? String(body.bio).trim() : "";
    const imageUrl = body.imageUrl ? String(body.imageUrl).trim() : "";

    if (!designation || !subject || !qualification || !experience) {
      return NextResponse.json(
        { success: false, error: "Faculty signup needs designation, subject, qualification, and experience." },
        { status: 400 }
      );
    }

    const existingFaculty = await FacultyLogin.findOne({ email }).lean();
    if (existingFaculty) {
      return NextResponse.json(
        { success: false, error: "A faculty account with that email already exists." },
        { status: 409 }
      );
    }

    const facultyProfile = await Faculty.create({
      name,
      designation,
      subject,
      qualification,
      experience,
      bio,
      imageUrl,
    });

    const user = await FacultyLogin.create({
      facultyId: facultyProfile._id,
      email,
      password,
      name,
      designation,
    });

    const token = signToken({ id: user._id.toString(), email: user.email, role });
    const res = NextResponse.json(
      {
        success: true,
        data: {
          name: user.name,
          email: user.email,
          role,
          designation: user.designation,
        },
        redirectTo: REDIRECT_MAP[role],
      },
      { status: 201 }
    );

    setLoginCookies(res, token);
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Unable to create account right now." },
      { status: 500 }
    );
  }
}
