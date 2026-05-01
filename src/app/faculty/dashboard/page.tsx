"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaClipboardCheck, FaSpinner } from "react-icons/fa";
import ChangePasswordCard from "@/frontend/components/auth/ChangePasswordCard";

type Student = {
  _id: string;
  name: string;
  rollNumber: string;
  class: string;
};

type Status = "present" | "absent" | "late";

export default function FacultyDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(today);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [attendance, setAttendance] = useState<Record<string, Status>>({});

  const presentCount = useMemo(
    () => Object.values(attendance).filter((status) => status === "present").length,
    [attendance]
  );

  const loadStudents = async () => {
    if (!className.trim()) {
      setMessage({ type: "error", text: "Enter a class to load students." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.get(`/api/students?className=${encodeURIComponent(className.trim())}`);
      const nextStudents = res.data.data || [];
      setStudents(nextStudents);
      setAttendance(
        Object.fromEntries(nextStudents.map((student: Student) => [student._id, "present" as Status]))
      );
      if (nextStudents.length === 0) {
        setMessage({ type: "error", text: "No students found for this class." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Unable to load students." });
    } finally {
      setLoading(false);
    }
  };

  const setStatus = (studentId: string, status: Status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    if (!className.trim() || !subject.trim() || !date) {
      setMessage({ type: "error", text: "Class, subject, and date are required." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await axios.post("/api/attendance", {
        className: className.trim(),
        subject: subject.trim(),
        date,
        records: students.map((student) => ({
          studentId: student._id,
          status: attendance[student._id] || "present",
        })),
      });
      setMessage({ type: "success", text: "Attendance saved successfully." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Unable to save attendance." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
            <FaClipboardCheck />
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Mark Attendance</h2>
            <p className="text-sm text-slate-500">Staff can load a class list and mark present, absent, or late.</p>
          </div>
        </div>
      </section>

      {message ? (
        <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${message.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      ) : null}

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
          <label>
            <span className="mb-2 block text-sm font-semibold text-gray-700">Class</span>
            <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Grade 7" className="input-field" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-semibold text-gray-700">Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Mathematics" className="input-field" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-semibold text-gray-700">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </label>
          <div className="flex items-end">
            <button onClick={loadStudents} disabled={loading} className="btn-primary w-full md:w-auto">
              {loading ? <><FaSpinner className="animate-spin" /> Loading...</> : "Load Students"}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Class Attendance</h3>
            <p className="text-sm text-slate-500">{students.length ? `${presentCount}/${students.length} marked present` : "Load a class to begin."}</p>
          </div>
          <button onClick={handleSave} disabled={saving || students.length === 0} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Save Attendance"}
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
          {students.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500">No students loaded.</div>
          ) : (
            students.map((student) => (
              <div key={student._id} className="grid gap-3 border-t border-gray-100 px-4 py-3 first:border-t-0 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.rollNumber} · {student.class}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["present", "absent", "late"] as Status[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatus(student._id, status)}
                      className={`rounded-lg px-3 py-2 text-xs font-bold capitalize transition ${
                        attendance[student._id] === status
                          ? status === "present"
                            ? "bg-green-600 text-white"
                            : status === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <ChangePasswordCard />
    </div>
  );
}
