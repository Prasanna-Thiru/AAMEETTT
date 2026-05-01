"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BiBookOpen, BiCalendar, BiLockAlt, BiTime } from "react-icons/bi";
import { FaClipboardCheck, FaSpinner } from "react-icons/fa";
import ChangePasswordCard from "@/frontend/components/auth/ChangePasswordCard";

type TimetableEntry = {
  _id: string;
  className: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room?: string;
  note?: string;
};

type AttendanceRecord = {
  _id: string;
  date: string;
  subject: string;
  status: "present" | "absent" | "late";
};

const upcomingFeatures = [
  "Assignments and submissions",
  "Grade book and report cards",
  "Learning resources by subject",
  "Messages and announcements",
];

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const me = await axios.get("/api/auth/me");
        const currentUser = me.data.data;
        setUser(currentUser);

        const [timetableRes, attendanceRes] = await Promise.all([
          axios.get(`/api/timetable?className=${encodeURIComponent(currentUser.class || "")}`),
          axios.get("/api/attendance"),
        ]);

        setTimetable(timetableRes.data.data || []);
        setAttendance(attendanceRes.data.data || []);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const groupedTimetable = dayOrder
    .map((day) => ({
      day,
      entries: timetable.filter((entry) => entry.day === day),
    }))
    .filter((group) => group.entries.length > 0);

  const attendanceSummary = attendance.reduce(
    (summary, record) => {
      summary[record.status] += 1;
      return summary;
    },
    { present: 0, absent: 0, late: 0 }
  );

  if (loading) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">Student Portal</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Welcome, {user?.name || "Student"}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          The portal is being rolled out in phases. For now, you can view the official timetable added by admin,
          check attendance marked by staff, and change your password.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BiBookOpen size={22} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-500">Class</p>
              <p className="text-xl font-black text-slate-950">{user?.class || "Not assigned"}</p>
            </div>
          </div>
        </article>
        <article className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white">
              <FaClipboardCheck />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-500">Present Marks</p>
              <p className="text-xl font-black text-slate-950">{attendanceSummary.present}</p>
            </div>
          </div>
        </article>
        <article className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500 text-white">
              <BiTime size={22} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-500">Timetable Entries</p>
              <p className="text-xl font-black text-slate-950">{timetable.length}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-lg border border-white/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
        <div className="flex items-center gap-3">
          <BiCalendar className="text-2xl text-blue-600" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">Official timetable</p>
            <h3 className="text-xl font-black text-slate-950">Class Schedule</h3>
          </div>
        </div>

        {groupedTimetable.length === 0 ? (
          <p className="mt-5 rounded-lg bg-blue-50 px-4 py-5 text-sm font-semibold text-blue-700">
            Timetable has not been published for your class yet.
          </p>
        ) : (
          <div className="mt-5 space-y-5">
            {groupedTimetable.map((group) => (
              <div key={group.day}>
                <h4 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500">{group.day}</h4>
                <div className="overflow-hidden rounded-lg border border-slate-100">
                  {group.entries.map((entry) => (
                    <div key={entry._id} className="grid gap-2 border-t border-slate-100 px-4 py-3 first:border-t-0 md:grid-cols-[8rem_1fr_1fr] md:items-center">
                      <p className="text-sm font-black text-blue-700">{entry.startTime} - {entry.endTime}</p>
                      <p className="text-sm font-bold text-slate-950">{entry.subject}</p>
                      <p className="text-sm text-slate-500">{entry.teacherName}{entry.room ? ` · ${entry.room}` : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-dashed border-blue-200 bg-blue-50/70 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-700">
            <BiLockAlt size={22} />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">Upcoming features</p>
            <h3 className="text-xl font-black text-slate-950">Coming Soon</h3>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {upcomingFeatures.map((feature) => (
            <div key={feature} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              {feature}
            </div>
          ))}
        </div>
      </section>

      <ChangePasswordCard />
    </div>
  );
}
