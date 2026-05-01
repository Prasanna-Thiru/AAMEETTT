"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import PageHero from "@/frontend/components/ui/PageHero";
import { SectionHeader } from "@/frontend/components/ui";
import { FaTimes, FaExpand, FaYoutube, FaLeaf, FaDesktop, FaRunning, FaStar, FaBed } from "react-icons/fa";
import type { GalleryItem, GalleryCategory } from "@/frontend/types";

const CATEGORIES: (GalleryCategory | "All")[] = ["All", "Campus", "Classrooms", "Sports", "Events", "Residential"];

const PLACEHOLDER_ICONS: Record<string, React.ElementType> = {
  Campus: FaLeaf, Classrooms: FaDesktop, Sports: FaRunning, Events: FaStar, Residential: FaBed,
};

const PLACEHOLDER_ITEMS: GalleryItem[] = [
  { title: "Campus Overview",    category: "Campus",      mediaType: "image", url: "" },
  { title: "Main Entrance",      category: "Campus",      mediaType: "image", url: "" },
  { title: "Green Grounds",      category: "Campus",      mediaType: "image", url: "" },
  { title: "Smart Classroom",    category: "Classrooms",  mediaType: "image", url: "" },
  { title: "AI & Robotics Lab",  category: "Classrooms",  mediaType: "image", url: "" },
  { title: "Library",            category: "Classrooms",  mediaType: "image", url: "" },
  { title: "Cricket Ground",     category: "Sports",      mediaType: "image", url: "" },
  { title: "Swimming Pool",      category: "Sports",      mediaType: "image", url: "" },
  { title: "Basketball Court",   category: "Sports",      mediaType: "image", url: "" },
  { title: "Annual Day",         category: "Events",      mediaType: "image", url: "" },
  { title: "Cultural Program",   category: "Events",      mediaType: "image", url: "" },
  { title: "Science Exhibition", category: "Events",      mediaType: "image", url: "" },
  { title: "Hostel Rooms",       category: "Residential", mediaType: "image", url: "" },
  { title: "Dining Hall",        category: "Residential", mediaType: "image", url: "" },
  { title: "Study Hall",         category: "Residential", mediaType: "image", url: "" },
];

export default function GalleryPage() {
  const [items, setItems]           = useState<GalleryItem[]>(PLACEHOLDER_ITEMS);
  const [active, setActive]         = useState<GalleryCategory | "All">("All");
  const [lightbox, setLightbox]     = useState<GalleryItem | null>(null);

  useEffect(() => {
    axios.get("/api/gallery").then((r) => {
      if (r.data.success && r.data.data.length > 0) setItems(r.data.data);
    }).catch(() => {});
  }, []);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <PageHero title="Our" highlight="Gallery" subtitle="A glimpse into the vibrant life and world-class environment at MNRS." breadcrumb="Gallery" />

      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? "bg-brand-green text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-brand-green/10 hover:text-brand-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => {
                const Icon = PLACEHOLDER_ICONS[item.category] || FaLeaf;
                return (
                  <motion.div
                    key={`${item.title}-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-brand-green-dark to-brand-blue"
                    onClick={() => setLightbox(item)}
                  >
                    {item.url ? (
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/60">
                        <Icon className="text-4xl mb-2 text-white/40" />
                        <span className="text-xs text-white/50">{item.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 transition-all duration-300 flex items-center justify-center">
                      <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium">{item.title}</p>
                      <p className="text-white/60 text-xs">{item.category}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-pad bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Video Gallery" title="Watch" highlight="MNRS" subtitle="Campus tour and school life videos. More content coming soon." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Campus Tour", "About MNRS", "Sports Facilities"].map((title) => (
              <div key={title} className="card p-8 text-center">
                <FaYoutube className="text-5xl text-red-500 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-brand-dark mb-2">{title}</h3>
                <p className="text-sm text-gray-400">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white"
                aria-label="Close lightbox"
              >
                <FaTimes size={24} />
              </button>
              <div className="bg-brand-dark rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                {lightbox.url ? (
                  <img src={lightbox.url} alt={lightbox.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-white/40">
                    <div className="text-6xl mb-3">🖼️</div>
                    <p className="text-sm">{lightbox.title}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{lightbox.title}</p>
                <p className="text-white/50 text-sm">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
