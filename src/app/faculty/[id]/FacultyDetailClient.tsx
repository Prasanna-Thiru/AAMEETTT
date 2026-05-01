"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUserTie,
  FaGraduationCap,
  FaBriefcase,
  FaBook,
  FaCheckCircle,
  FaSpa,
  FaEnvelope,
} from "react-icons/fa";
import type { FacultyMember } from "@/frontend/types";

export default function FacultyDetailClient({ faculty }: { faculty: FacultyMember }) {
  // Generate generic teaching highlights based on their subject if needed
  const highlights = [
    "Expert subject knowledge",
    "Holistic approach to education",
    "Student-focused mentoring",
    "Continuous professional development"
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-blue overflow-hidden pt-24 pb-20">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-brand-blue-light/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold mb-8 transition-colors text-sm font-medium group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-xs" />
            Back to Faculty Directory
          </Link>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-xl backdrop-blur overflow-hidden group">
                {faculty.imageUrl ? (
                  <img src={faculty.imageUrl} alt={faculty.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <FaUserTie className="text-white text-6xl md:text-8xl opacity-80" />
                )}
              </div>
              {/* Status badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-brand-gold border-4 border-brand-green-dark shadow-lg flex items-center justify-center"
              >
                 <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </motion.div>
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left text-white flex-1"
            >
              <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="w-4 h-px bg-brand-gold"></span>
                Faculty Member
              </p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{faculty.name}</h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 font-medium">{faculty.designation}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/20 transition-colors">
                  <FaBook className="text-brand-gold" />
                  {faculty.subject}
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/20 transition-colors">
                  <FaBriefcase className="text-brand-gold" />
                  {faculty.experience}
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/20 transition-colors">
                  <FaGraduationCap className="text-brand-gold" />
                  {faculty.qualification}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-brand-green/10 p-6 md:p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-brand-gold rounded-full" />
                About {faculty.name.split(" ")[0]}
              </h2>
              <div className="prose prose-brand max-w-none text-gray-600">
                <p className="leading-relaxed">
                  {faculty.bio || `${faculty.name} is a dedicated educator specializing in ${faculty.subject}. With ${faculty.experience} of experience, they bring a wealth of knowledge and a passion for teaching to MNRS.`}
                </p>
              </div>
            </div>

            {/* Teaching Highlights */}
            <div className="bg-white rounded-2xl shadow-sm border border-brand-green/10 p-6 md:p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-brand-gold rounded-full" />
                Teaching Approach
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-brand-cream/50 border border-brand-green/5 hover:border-brand-green/20 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors text-brand-green mt-0.5">
                      <FaCheckCircle className="text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm pt-1">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gradient-to-br from-brand-green-dark to-brand-green rounded-2xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <FaSpa className="text-8xl text-white" />
               </div>
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3 relative z-10">
                <FaSpa className="text-brand-gold text-2xl" />
                Educational Philosophy
              </h2>
              <p className="text-white/90 text-sm md:text-base leading-relaxed relative z-10">
                At MNRS, every educator believes in the holistic development of students.
                {faculty.name.split(" ")[0]} embodies this philosophy through dedicated mentorship,
                rigorous academic standards, and a genuine care for student well-being. The focus is
                not just on imparting knowledge, but on nurturing critical thinking, creativity, and
                character development in alignment with Consciousness-Based Education principles.
              </p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 lg:self-start lg:sticky lg:top-24"
          >
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border-t-4 border-t-brand-green p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-serif font-bold text-brand-dark mb-6">Professional Details</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaBook className="text-brand-green text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-brand-gold tracking-wider mb-0.5">Subject Focus</p>
                    <p className="text-gray-800 font-semibold text-sm">{faculty.subject}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaBriefcase className="text-brand-blue text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-brand-gold tracking-wider mb-0.5">Role</p>
                    <p className="text-gray-800 font-semibold text-sm">{faculty.designation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaGraduationCap className="text-brand-gold text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-brand-gold tracking-wider mb-0.5">Qualifications</p>
                    <p className="text-gray-800 font-semibold text-sm">{faculty.qualification}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-dark/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheckCircle className="text-brand-dark/60 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-brand-gold tracking-wider mb-0.5">Experience</p>
                    <p className="text-gray-800 font-semibold text-sm">{faculty.experience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-brand-blue-light rounded-2xl shadow-sm p-6 text-white text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur">
                 <FaEnvelope className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-serif font-bold mb-2">Engage with MNRS</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-6">
                Are you looking for an environment that nurtures holistic growth? Connect with our admissions team.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white text-brand-blue-light font-bold text-sm rounded-xl hover:bg-brand-cream hover:text-brand-blue transition-all duration-300 shadow-sm"
              >
                Admissions Enquiry
              </Link>
            </div>
            
            {/* Value Addition */}
             <div className="bg-white rounded-2xl shadow-sm border border-brand-green/10 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                   <FaSpa className="text-brand-gold text-xl" />
                </div>
                <div>
                   <p className="text-sm font-bold text-brand-dark">CBE Certified</p>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wide">Continuous Development</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
