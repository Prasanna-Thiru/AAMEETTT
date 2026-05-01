"use client";
import { motion } from "framer-motion";
import { FaNetworkWired, FaInfinity, FaSpa, FaBookOpen, FaSchool, FaMedal, FaRunning, FaShieldAlt } from "react-icons/fa";
import { SectionHeader, AnimatedCard } from "@/frontend/components/ui";

const REASONS = [
  { icon: FaNetworkWired, title: "Trusted MVM Network",           desc: "Part of the prestigious pan-India Maharishi Vidya Mandir network with decades of educational excellence." },
  { icon: FaInfinity,     title: "Consciousness-Based Education", desc: "A research-backed approach that develops the full potential of every student — mind, body, and spirit." },
  { icon: FaSpa,          title: "Transcendental Meditation",     desc: "Daily TM practice proven to enhance focus, reduce stress, and improve academic performance." },
  { icon: FaBookOpen,     title: "CBSE + Future-Ready Learning",  desc: "Rigorous CBSE curriculum enriched with AI, robotics, and 21st-century skills for tomorrow's world." },
  { icon: FaSchool,       title: "Flexible Day & Residential",    desc: "Choose what works best for your family — day schooling or a fully supervised residential experience." },
  { icon: FaMedal,        title: "Discipline & Leadership",       desc: "Structured routines and mentorship programs that build character, confidence, and leadership skills." },
  { icon: FaRunning,      title: "World-Class Sports",            desc: "Cricket, football, swimming, shooting range, and more — sports as a pillar of holistic development." },
  { icon: FaShieldAlt,    title: "Safe & Nurturing Campus",       desc: "A secure, pollution-free environment where every child feels at home and thrives with confidence." },
];

export default function WhyChooseSection() {
  return (
    <section className="section-pad bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Why MNRS"
          title="Why Choose"
          highlight="MNRS?"
          subtitle="A school that shapes not just students — but future leaders, thinkers, and compassionate human beings."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => (
            <AnimatedCard key={r.title} delay={i * 0.07}>
              <div className="card p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <r.icon className="text-brand-green text-xl" />
                </div>
                <h3 className="font-serif text-base font-bold text-brand-dark mb-2">{r.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
