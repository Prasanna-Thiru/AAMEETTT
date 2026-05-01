"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/frontend/hooks/useAuth";
import { FaSpinner, FaTrash, FaFilter, FaPhone, FaEnvelope } from "react-icons/fa";
import type { AdmissionLead } from "@/frontend/types";

const STATUSES = ["all", "new", "contacted", "confirmed", "rejected"] as const;
type StatusFilter = (typeof STATUSES)[number];

const STATUS_COLORS: Record<string, string> = {
  new:       "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  rejected:  "bg-red-100 text-red-700",
};

export default function AdminAdmissionsPage() {
  const { loading: authLoading } = useAuth();
  const [leads, setLeads]         = useState<AdmissionLead[]>([]);
  const [filter, setFilter]       = useState<StatusFilter>("all");
  const [fetching, setFetching]   = useState(true);

  const fetchLeads = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/admissions");
      setLeads(res.data.data || []);
    } catch {
      toast.error("Failed to load admissions.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchLeads();
  }, [authLoading]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/admissions/${id}`, { status });
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: status as any } : l)));
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this admission lead?")) return;
    try {
      await axios.delete(`/api/admissions/${id}`);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lead deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  if (authLoading || fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-brand-green text-3xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Admission Leads</h2>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total applications received</p>
        </div>
        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <FaFilter className="text-gray-400 text-sm" />
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                filter === s ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-400 text-sm">No admission leads found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <div key={lead._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-serif font-bold text-brand-dark">{lead.studentName}</h3>
                    <span className="bg-brand-green/10 text-brand-green text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {lead.classApplying}
                    </span>
                    <span className="bg-brand-blue/10 text-brand-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {lead.schoolingType}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Parent: <span className="text-gray-700 font-medium">{lead.parentName}</span></p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <a href={`tel:${lead.contactNumber}`} className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                      <FaPhone className="text-xs" /> {lead.contactNumber}
                    </a>
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                      <FaEnvelope className="text-xs" /> {lead.email}
                    </a>
                  </div>
                  {lead.message && (
                    <p className="mt-2 text-xs text-gray-400 italic bg-gray-50 rounded-lg px-3 py-2">"{lead.message}"</p>
                  )}
                  <p className="text-xs text-gray-300 mt-2">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id!, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteLead(lead._id!)}
                    className="w-9 h-9 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                    aria-label="Delete lead"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
