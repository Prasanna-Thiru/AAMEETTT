import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import { getAnyTokenFromRequest, verifyToken } from "@/backend/lib/auth";
import TimetableEntry from "@/database/models/TimetableEntry";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function requireAdmin(req: NextRequest) {
  const token = getAnyTokenFromRequest(req);
  if (!token) throw new Error("Unauthorized");
  const payload = verifyToken(token);
  if (!["superadmin", "editor"].includes(payload.role)) throw new Error("Forbidden");
  return payload;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const className = req.nextUrl.searchParams.get("className")?.trim();
    const query = className ? { className } : {};
    const entries = await TimetableEntry.find(query).sort({ className: 1, day: 1, startTime: 1 }).lean();
    return NextResponse.json({ success: true, data: entries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Unable to load timetable." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    await connectDB();

    const body = await req.json();
    const className = String(body.className || "").trim();
    const day = String(body.day || "").trim();
    const startTime = String(body.startTime || "").trim();
    const endTime = String(body.endTime || "").trim();
    const subject = String(body.subject || "").trim();
    const teacherName = String(body.teacherName || "").trim();
    const room = String(body.room || "").trim();
    const note = String(body.note || "").trim();

    if (!className || !day || !startTime || !endTime || !subject || !teacherName) {
      return NextResponse.json({ success: false, error: "Class, day, time, subject, and teacher are required." }, { status: 400 });
    }

    if (!DAYS.includes(day)) {
      return NextResponse.json({ success: false, error: "Please choose a valid school day." }, { status: 400 });
    }

    const entry = await TimetableEntry.create({ className, day, startTime, endTime, subject, teacherName, room, note });
    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : err.message === "Forbidden" ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message || "Unable to create timetable entry." }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    requireAdmin(req);
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Entry id is required." }, { status: 400 });
    await TimetableEntry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : err.message === "Forbidden" ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message || "Unable to delete timetable entry." }, { status });
  }
}
