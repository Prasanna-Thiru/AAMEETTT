"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/frontend/hooks/useAuth";
import { FaSpinner, FaTrash, FaEdit, FaPlus, FaTimes, FaUserTie } from "react-icons/fa";
import type { FacultyMember } from "@/frontend/types";

type FormData = Omit<FacultyMember, "_id">;

const EMPTY: FormData = { name: "", designation: "", subject: "", qualification: "", experience: "", imageUrl: "", bio: "", order: 0 };

export default function AdminFacultyPage() {
  const { loading: authLoading } = useAuth();
  const [faculty, setFaculty]   = useState<FacultyMember[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<FacultyMember | null>(null);
  const [saving, setSaving]     = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ defaultValues: EMPTY });

  const fetchFaculty = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/faculty");
      setFaculty(res.data.data || []);
    } catch {
      toast.error("Failed to load faculty.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { if (!authLoading) fetchFaculty(); }, [authLoading]);

  const openAdd = () => { setEditing(null); reset(EMPTY); setShowForm(true); };
  const openEdit = (m: FacultyMember) => { setEditing(m); reset(m); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); reset(EMPTY); };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      if (editing?._id) {
        const res = await axios.put(`/api/faculty/${editing._id}`, data);
        setFaculty((prev) => prev.map((m) => (m._id === editing._id ? res.data.data : m)));
        toast.success("Faculty member updated.");
      } else {
        const res = await axios.post("/api/faculty", data);
        setFaculty((prev) => [...prev, res.data.data]);
        toast.success("Faculty member added.");
      }
      closeForm();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Delete this faculty member?")) return;
    try {
      await axios.delete(`/api/faculty/${id}`);
      setFaculty((prev) => prev.filter((m) => m._id !== id));
      toast.success("Faculty member deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (authLoading || fetching) {
    return <div className="flex items-center justify-center h-64"><FaSpinner className="animate-spin text-brand-green text-3xl" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Faculty Members</h2>
          <p className="text-gray-500 text-sm mt-1">{faculty.length} members</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <FaPlus /> Add Faculty
        </button>
      </div>

      {/* Faculty Grid */}
      {faculty.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <FaUserTie className="text-4xl text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No faculty members yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {faculty.map((m) => (
            <div key={m._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center mx-auto mb-3 overflow-hidden">
                {m.imageUrl ? (
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <FaUserTie className="text-white text-xl" />
                )}
              </div>
              <h3 className="font-serif font-bold text-brand-dark text-sm text-center mb-0.5">{m.name}</h3>
              <p className="text-brand-gold text-xs text-center font-semibold mb-0.5">{m.subject}</p>
              <p className="text-gray-400 text-xs text-center mb-3">{m.designation}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => openEdit(m)} className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-brand-green/10 text-brand-green hover:bg-brand-green/20 transition-colors font-medium">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteMember(m._id!)} className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors font-medium">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-brand-dark">
                {editing ? "Edit Faculty Member" : "Add Faculty Member"}
              </h3>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Name *</label>
                  <input {...register("name", { required: true })} className={`input-field ${errors.name ? "border-red-400" : ""}`} placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Designation *</label>
                  <input {...register("designation", { required: true })} className={`input-field ${errors.designation ? "border-red-400" : ""}`} placeholder="e.g. Senior Teacher" />
                </div>
                <div>
                  <label className="label">Subject *</label>
                  <input {...register("subject", { required: true })} className={`input-field ${errors.subject ? "border-red-400" : ""}`} placeholder="e.g. Mathematics" />
                </div>
                <div>
                  <label className="label">Qualification *</label>
                  <input {...register("qualification", { required: true })} className={`input-field ${errors.qualification ? "border-red-400" : ""}`} placeholder="e.g. M.Sc, B.Ed" />
                </div>
                <div>
                  <label className="label">Experience *</label>
                  <input {...register("experience", { required: true })} className={`input-field ${errors.experience ? "border-red-400" : ""}`} placeholder="e.g. 10 years" />
                </div>
                <div>
                  <label className="label">Display Order</label>
                  <input {...register("order", { valueAsNumber: true })} type="number" className="input-field" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="label">Photo URL</label>
                <input {...register("imageUrl")} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="label">Bio</label>
                <textarea {...register("bio")} className="input-field resize-none" rows={3} placeholder="Short bio..." />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 btn-outline justify-center">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center">
                  {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : editing ? "Update" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
