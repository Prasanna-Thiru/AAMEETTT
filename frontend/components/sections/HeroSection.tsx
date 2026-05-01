"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaChevronDown, FaLeaf, FaBook, FaGraduationCap, FaRocket, FaHome, FaLandmark } from "react-icons/fa";

const HIGHLIGHTS = [
  "10-Acre Green Campus",
  "CBSE Curriculum",
  "AI & Robotics Lab",
  "World-Class Sports",
  "Day & Residential",
  "Transcendental Meditation",
  "Smart Classrooms",
  "Rifle Shooting Range",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Layer 1: Real school/campus photo from Unsplash ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=85&auto=format&fit=crop')",
        }}
      />

      {/* ── Layer 2: Deep blue gradient overlay — keeps text readable ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071829]/95 via-[#0D47A1]/80 to-[#071829]/70" />

      {/* ── Layer 3: Subtle bottom vignette ── */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071829] to-transparent" />

      {/* ── Layer 4: Fine grain texture for depth ── */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* ── Decorative light rays ── */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-brand-gold/20 via-transparent to-transparent hidden lg:block" />
      <div className="absolute top-0 right-1/3 w-px h-2/3 bg-gradient-to-b from-white/5 via-transparent to-transparent hidden lg:block" />

      {/* ── Glowing orbs ── */}
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-brand-green/20 blur-[80px] hidden sm:block" />
      <div className="absolute bottom-1/4 left-10 w-56 h-56 rounded-full bg-brand-gold/15 blur-[60px] hidden sm:block" />

      {/* ── Content Container: Structured Two-Column Layout ── */}
      <div className="relative w-full">
        {/* Inner container: Fixed max-width with centered alignment */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
          
          {/* Two-column grid with responsive behavior */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Content (7 cols on lg) */}
            <div className="lg:col-span-7 w-full flex flex-col justify-start">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex w-fit items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-slow shrink-0" />
                Admissions Open 2027–2028 · LKG to Grade 7
              </motion.div>

              {/* Heading — Baseline anchor point */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Maharishi Vidya Mandir
                <br />
                <span className="text-brand-gold">National Residential</span>
                <br />
                School
              </motion.h1>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm mb-4"
              >
                <FaMapMarkerAlt className="text-brand-gold shrink-0" />
                <span>AMET Knowledge Park, ECR – Thenpattinam</span>
              </motion.div>

              {/* Motto */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-brand-gold-light font-serif text-base sm:text-lg italic mb-6"
              >
                "Educating the Mind. Awakening the Potential."
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8"
              >
                Where modern education meets ancient wisdom — a holistic learning environment
                that nurtures academic excellence, inner growth, and lifelong values through
                Day &amp; Residential schooling on a serene 10-acre green campus.
              </motion.p>

              {/* CTAs — Bottom anchor point */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link href="/admissions" className="btn-primary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base">
                  Apply for Admission
                </Link>
                <a
                  href="tel:+918939199005"
                  className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base"
                >
                  <FaPhone size={13} />
                  +91 89391 99005
                </a>
              </motion.div>
            </div>

            {/* Right Column: Feature Grid (5 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hidden lg:flex lg:col-span-5 w-full"
            >
              {/* Grid Container: 2x3 layout with equal heights */}
              <div className="w-full grid grid-cols-2 gap-4 auto-rows-max">
                {[
                  { value: "10 Acres", label: "Green Campus", bgColor: "bg-gradient-to-br from-emerald-400 to-teal-500", iconBg: "bg-gradient-to-br from-emerald-300 to-emerald-500", icon: FaLeaf },
                  { value: "CBSE",     label: "Curriculum", bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", iconBg: "bg-gradient-to-br from-blue-300 to-blue-600", icon: FaBook },
                  { value: "LKG–7",    label: "Current Classes", bgColor: "bg-gradient-to-br from-amber-400 to-orange-500", iconBg: "bg-gradient-to-br from-amber-300 to-orange-500", icon: FaGraduationCap },
                  { value: "K–12",     label: "Future Expansion", bgColor: "bg-gradient-to-br from-purple-400 to-purple-600", iconBg: "bg-gradient-to-br from-purple-300 to-purple-600", icon: FaRocket },
                  { value: "Day &",    label: "Residential", bgColor: "bg-gradient-to-br from-pink-400 to-rose-500", iconBg: "bg-gradient-to-br from-pink-300 to-rose-500", icon: FaHome },
                  { value: "TM",       label: "Daily Practice", bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-600", iconBg: "bg-gradient-to-br from-indigo-300 to-indigo-600", icon: FaLandmark },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.08 }}
                    whileHover={{ scale: 1.08 }}
                    className={`relative ${s.bgColor} rounded-2xl p-5 flex flex-col items-center justify-center h-48 group cursor-default shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                  >
                    {/* Decorative pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)`,
                      backgroundSize: "20px 20px"
                    }} />
                    
                    {/* Shine effect on hover */}
                    <div className="absolute -inset-full opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500" />
                    
                    {/* Icon container with pattern */}
                    <div className={`relative w-20 h-20 rounded-3xl ${s.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="absolute inset-0 rounded-3xl opacity-30" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)`
                      }} />
                      <s.icon className="text-4xl text-white relative drop-shadow-lg" />
                    </div>
                    
                    {/* Value */}
                    <p className="font-bold text-xl text-white text-center leading-tight drop-shadow-md relative">{s.value}</p>
                    
                    {/* Label */}
                    <p className="text-xs font-bold text-white/90 mt-2 uppercase tracking-wider text-center drop-shadow-md relative">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile stats strip — Stacked below on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="lg:hidden col-span-1 w-full grid grid-cols-3 gap-3"
            >
              {[
                { value: "10 Acres", label: "Campus", bgColor: "bg-gradient-to-br from-emerald-400 to-teal-500", iconBg: "bg-gradient-to-br from-emerald-300 to-emerald-500", icon: FaLeaf },
                { value: "CBSE",     label: "Curriculum", bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", iconBg: "bg-gradient-to-br from-blue-300 to-blue-600", icon: FaBook },
                { value: "LKG–7",    label: "Classes", bgColor: "bg-gradient-to-br from-amber-400 to-orange-500", iconBg: "bg-gradient-to-br from-amber-300 to-orange-500", icon: FaGraduationCap },
              ].map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative ${s.bgColor} rounded-xl p-4 flex flex-col items-center justify-center h-36 group cursor-default shadow-lg transition-all duration-300 overflow-hidden`}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)`,
                    backgroundSize: "15px 15px"
                  }} />
                  
                  {/* Icon container */}
                  <div className={`relative w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center mb-2 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <div className="absolute inset-0 rounded-2xl opacity-25" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)`
                    }} />
                    <s.icon className="text-2xl text-white relative drop-shadow-md" />
                  </div>
                  
                  {/* Content */}
                  <p className="font-bold text-sm text-white text-center leading-tight drop-shadow-md relative line-clamp-1">{s.value}</p>
                  <p className="text-[9px] font-bold text-white/90 mt-1 uppercase tracking-wider drop-shadow-md relative">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Highlights Marquee Strip */}
      <div className="relative bg-brand-gold/10 border-y border-brand-gold/20 py-2.5 overflow-hidden backdrop-blur-sm">
        <div className="flex marquee-track whitespace-nowrap">
          {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 text-xs sm:text-sm text-brand-gold font-medium">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-gold shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white/40"
      >
        <FaChevronDown size={18} />
      </motion.div>
    </section>
  );
}
