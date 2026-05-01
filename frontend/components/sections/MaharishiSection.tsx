"use client";
import { motion } from "framer-motion";
import { FaInfinity, FaSpa, FaFlask, FaCheckCircle } from "react-icons/fa";
import { SectionHeader, AnimatedCard } from "@/frontend/components/ui";

const TM_BENEFITS = [
  "Inner calm and reduced anxiety",
  "Improved memory and concentration",
  "Enhanced academic performance",
  "Emotional balance and resilience",
  "Stress-free, joyful learning",
  "Greater creativity and problem-solving",
];

export default function MaharishiSection() {
  return (
    <section className="section-pad bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-green-dark to-brand-blue opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="The Maharishi Approach"
          title="Consciousness-Based"
          highlight="Education"
          subtitle="A scientifically validated system that unlocks the full potential of every learner."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CBE */}
          <AnimatedCard delay={0}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-5">
                <FaInfinity className="text-brand-gold text-xl" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Consciousness-Based Education</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                CBE is the educational philosophy developed by Maharishi Mahesh Yogi. It recognizes that the source of all knowledge lies within — in the pure consciousness of the student. By developing this inner resource, students gain access to greater creativity, intelligence, and clarity in all areas of learning.
              </p>
            </div>
          </AnimatedCard>

          {/* TM */}
          <AnimatedCard delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-5">
                <FaSpa className="text-brand-gold text-xl" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Transcendental Meditation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                TM is a simple, natural, effortless technique practiced for 15–20 minutes twice daily. At MNRS, students practice TM as part of their daily routine — allowing the mind to settle into a state of deep rest and heightened awareness that supports all aspects of learning and growth.
              </p>
            </div>
          </AnimatedCard>

          {/* Benefits */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-5">
                <FaFlask className="text-brand-gold text-xl" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">Scientifically Validated Benefits</h3>
              <ul className="space-y-3">
                {TM_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-gray-300">
                    <FaCheckCircle className="text-brand-gold mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
