"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaSpinner, FaTrash } from "react-icons/fa";

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

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminTimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState({
    className: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    subject: "",
    teacherName: "",
    room: "",
    note: "",
  });

  const classes = useMemo(() => Array.from(new Set(entries.map((entry) => entry.className))).sort(), [entries]);

  const loadEntries = async () => {
    try {
      const res = await axios.get("/api/timetable");
      setEntries(res.data.data || []);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Unable to load timetable." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await axios.post("/api/timetable", form);
      setMessage({ type: "success", text: "Timetable entry added." });
      setForm({ className: "", day: "Monday", startTime: "", endTime: "", subject: "", teacherName: "", room: "", note: "" });
      await loadEntries();
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Unable to save timetable entry." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setMessage(null);
    try {
      await axios.delete(`/api/timetable?id=${id}`);
      setMessage({ type: "success", text: "Timetable entry removed." });
      await loadEntries();
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Unable to delete timetable entry." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-brand-dark to-brand-blue p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-2xl" />
          <div>
            <h2 className="font-serif text-2xl font-bold">School Timetable</h2>
            <p className="mt-1 text-sm text-blue-100">Create real class schedules that students can see in their portal.</p>
          </div>
        </div>
      </div>

      {message ? (
        <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${message.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Class</span>
            <input required value={form.className} onChange={(e) => updateForm("className", e.target.value)} placeholder="Grade 7" className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Day</span>
            <select value={form.day} onChange={(e) => updateForm("day", e.target.value)} className="input-field">
              {DAYS.map((day) => <option key={day}>{day}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Start</span>
            <input required type="time" value={form.startTime} onChange={(e) => updateForm("startTime", e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">End</span>
            <input required type="time" value={form.endTime} onChange={(e) => updateForm("endTime", e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Subject</span>
            <input required value={form.subject} onChange={(e) => updateForm("subject", e.target.value)} placeholder="Mathematics" className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Teacher</span>
            <input required value={form.teacherName} onChange={(e) => updateForm("teacherName", e.target.value)} placeholder="Mrs. Kavitha" className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Room</span>
            <input value={form.room} onChange={(e) => updateForm("room", e.target.value)} placeholder="Room 204" className="input-field" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Note</span>
            <input value={form.note} onChange={(e) => updateForm("note", e.target.value)} placeholder="Optional" className="input-field" />
          </label>
        </div>
        <button disabled={saving} className="btn-primary mt-5">
          {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Add Timetable Entry"}
        </button>
      </form>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-brand-dark">Current Timetable</h3>
        {loading ? (
          <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-brand-green text-2xl" /></div>
        ) : entries.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No timetable entries yet.</p>
        ) : (
          <div className="mt-5 space-y-6">
            {(classes.length ? classes : ["All"]).map((className) => (
              <div key={className}>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">{className}</h4>
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  {entries.filter((entry) => entry.className === className).map((entry) => (
                    <div key={entry._id} className="grid gap-3 border-t border-gray-100 px-4 py-3 first:border-t-0 md:grid-cols-[7rem_8rem_1fr_1fr_auto] md:items-center">
                      <span className="text-sm font-bold text-brand-green">{entry.day}</span>
                      <span className="text-sm text-gray-600">{entry.startTime} - {entry.endTime}</span>
                      <span className="text-sm font-semibold text-gray-900">{entry.subject}</span>
                      <span className="text-sm text-gray-600">{entry.teacherName}{entry.room ? ` · ${entry.room}` : ""}</span>
                      <button onClick={() => handleDelete(entry._id)} className="justify-self-start rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 md:justify-self-end" aria-label="Delete entry">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
