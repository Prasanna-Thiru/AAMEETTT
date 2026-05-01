import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { getAnyTokenFromRequest, verifyToken } from "@/backend/lib/auth";
import AttendanceRecord from "@/database/models/AttendanceRecord";
import Student from "@/database/models/Student";

type AttendanceStatus = "present" | "absent" | "late";
type IncomingAttendanceRecord = {
  studentId: string;
  status: AttendanceStatus;
};

function getPayload(req: NextRequest) {
  const token = getAnyTokenFromRequest(req);
  if (!token) throw new Error("Unauthorized");
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  try {
    const payload = getPayload(req);
    await connectDB();

    const className = req.nextUrl.searchParams.get("className")?.trim();
    const date = req.nextUrl.searchParams.get("date")?.trim();
    const subject = req.nextUrl.searchParams.get("subject")?.trim();

    if (payload.role === "student") {
      const records = await AttendanceRecord.find({ studentId: payload.id }).sort({ date: -1 }).limit(50).lean();
      return NextResponse.json({ success: true, data: records });
    }

    if (!["faculty", "superadmin", "editor"].includes(payload.role)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const query: Record<string, string> = {};
    if (className) query.className = className;
    if (date) query.date = date;
    if (subject) query.subject = subject;

    const records = await AttendanceRecord.find(query).populate("studentId", "name rollNumber class").sort({ date: -1 }).lean();
    return NextResponse.json({ success: true, data: records });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ success: false, error: err.message || "Unable to load attendance." }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = getPayload(req);
    if (!["faculty", "superadmin", "editor"].includes(payload.role)) {
      return NextResponse.json({ success: false, error: "Only staff can mark attendance." }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const className = String(body.className || "").trim();
    const date = String(body.date || "").trim();
    const subject = String(body.subject || "").trim();
    const records = Array.isArray(body.records) ? body.records : [];

    if (!className || !date || !subject || records.length === 0) {
      return NextResponse.json({ success: false, error: "Class, date, subject, and attendance records are required." }, { status: 400 });
    }

    const students = await Student.find({ class: className }).select("_id").lean();
    const allowedStudentIds = new Set(students.map((student) => student._id.toString()));

    const writes = records
      .map((record: any) => ({
        studentId: String(record.studentId || ""),
        status: String(record.status || "") as AttendanceStatus,
      }))
      .filter((record: IncomingAttendanceRecord) => allowedStudentIds.has(record.studentId) && ["present", "absent", "late"].includes(record.status))
      .map((record: IncomingAttendanceRecord) => ({
        updateOne: {
          filter: { studentId: record.studentId, date, subject },
          update: {
            $set: {
              studentId: record.studentId,
              className,
              date,
              subject,
              status: record.status,
              markedBy: payload.id,
              markedByName: payload.email,
            },
          },
          upsert: true,
        },
      }));

    if (writes.length === 0) {
      return NextResponse.json({ success: false, error: "No valid attendance records were provided." }, { status: 400 });
    }

    await AttendanceRecord.bulkWrite(writes);
    return NextResponse.json({ success: true, message: "Attendance saved successfully." });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ success: false, error: err.message || "Unable to save attendance." }, { status });
  }
}
