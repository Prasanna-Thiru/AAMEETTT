"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/frontend/hooks/useAuth";
import { FaSpinner, FaTrash, FaPlus, FaTimes, FaImage, FaFilter } from "react-icons/fa";
import type { GalleryItem, GalleryCategory } from "@/frontend/types";

type FormData = Omit<GalleryItem, "_id" | "createdAt">;

const CATEGORIES: GalleryCategory[] = ["Campus", "Classrooms", "Sports", "Events", "Residential"];
const EMPTY: FormData = { title: "", category: "Campus", mediaType: "image", url: "", thumbnailUrl: "", description: "" };

export default function AdminGalleryPage() {
  const { loading: authLoading } = useAuth();
  const [items, setItems]         = useState<GalleryItem[]>([]);
  const [fetching, setFetching]   = useState(true);
  const [filter, setFilter]       = useState<GalleryCategory | "All">("All");
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ defaultValues: EMPTY });

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/gallery");
      setItems(res.data.data || []);
    } catch {
      toast.error("Failed to load gallery.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { if (!authLoading) fetchItems(); }, [authLoading]);

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const res = await axios.post("/api/gallery", data);
      setItems((prev) => [res.data.data, ...prev]);
      toast.success("Gallery item added.");
      setShowForm(false);
      reset(EMPTY);
    } catch {
      toast.error("Failed to add item.");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Item deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  if (authLoading || fetching) {
    return <div className="flex items-center justify-center h-64"><FaSpinner className="animate-spin text-brand-green text-3xl" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Gallery</h2>
          <p className="text-gray-500 text-sm mt-1">{items.length} items</p>
        </div>
        <button onClick={() => { reset(EMPTY); setShowForm(true); }} className="btn-primary text-sm">
          <FaPlus /> Add Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <FaFilter className="text-gray-400 text-sm" />
        {(["All", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === cat ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <FaImage className="text-4xl text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No gallery items yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item._id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-brand-green-dark to-brand-blue flex items-center justify-center overflow-hidden">
                {item.url ? (
                  <img src={item.thumbnailUrl || item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <FaImage className="text-white/30 text-3xl" />
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-brand-dark text-xs truncate">{item.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{item.category}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${item.mediaType === "video" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                    {item.mediaType}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteItem(item._id!)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md"
                aria-label="Delete item"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-brand-dark">Add Gallery Item</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="label">Title *</label>
                <input {...register("title", { required: true })} className={`input-field ${errors.title ? "border-red-400" : ""}`} placeholder="e.g. Campus Overview" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category *</label>
                  <select {...register("category", { required: true })} className="input-field">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Media Type *</label>
                  <select {...register("mediaType", { required: true })} className="input-field">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">URL *</label>
                <input {...register("url", { required: true })} className={`input-field ${errors.url ? "border-red-400" : ""}`} placeholder="https://..." />
              </div>

              <div>
                <label className="label">Thumbnail URL</label>
                <input {...register("thumbnailUrl")} className="input-field" placeholder="https://... (optional)" />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea {...register("description")} className="input-field resize-none" rows={2} placeholder="Optional description..." />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 btn-outline justify-center">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center">
                  {saving ? <><FaSpinner className="animate-spin" /> Adding...</> : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
