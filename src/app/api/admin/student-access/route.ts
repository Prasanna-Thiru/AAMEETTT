import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import StudentAccess from "@/database/models/StudentAccess";
import Student from "@/database/models/Student";
import { normalizeStudentEmail } from "@/backend/lib/studentAccess";
import { requireAdminAuth } from "@/backend/lib/auth";

function assertAdmin(req: NextRequest) {
  try {
    return requireAdminAuth(req);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const admin = assertAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const accessList = await StudentAccess.find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  const emails = accessList.map((item) => item.email);
  const existingStudents = await Student.find({ email: { $in: emails } })
    .select("email name rollNumber class")
    .lean();
  const studentsByEmail = new Map(existingStudents.map((student) => [student.email, student]));

  return NextResponse.json({
    success: true,
    data: accessList.map((item) => {
      const student = studentsByEmail.get(item.email);

      return {
        id: item._id.toString(),
        email: item.email,
        note: item.note || "",
        usedAt: item.usedAt || null,
        createdAt: item.createdAt,
        student: student
          ? {
              name: student.name,
              rollNumber: student.rollNumber,
              class: student.class,
            }
          : null,
      };
    }),
  });
}

export async function POST(req: NextRequest) {
  const admin = assertAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();
  const email = normalizeStudentEmail(body.email);
  const note = String(body.note || "").trim();

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Student email is required." },
      { status: 400 }
    );
  }

  const access = await StudentAccess.findOneAndUpdate(
    { email },
    {
      $setOnInsert: {
        createdBy: admin.id,
        createdByEmail: admin.email,
      },
      $set: { note },
    },
    { new: true, upsert: true }
  );

  return NextResponse.json({
    success: true,
    data: {
      id: access._id.toString(),
      email: access.email,
      note: access.note || "",
      usedAt: access.usedAt || null,
      createdAt: access.createdAt,
    },
  });
}

export async function DELETE(req: NextRequest) {
  const admin = assertAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const email = normalizeStudentEmail(req.nextUrl.searchParams.get("email"));

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Student email is required." },
      { status: 400 }
    );
  }

  await StudentAccess.deleteOne({ email });
  return NextResponse.json({ success: true });
}
