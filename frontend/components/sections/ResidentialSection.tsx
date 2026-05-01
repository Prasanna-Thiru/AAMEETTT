"use client";
import { FaBed, FaUtensils, FaBook, FaUserShield } from "react-icons/fa";
import { SectionHeader, AnimatedCard } from "@/frontend/components/ui";

const RESIDENTIAL_FEATURES = [
  { icon: FaBed,        title: "Comfortable Hostel",          desc: "Hygienic, well-maintained dormitories with proper ventilation, furniture, and storage — a true home away from home." },
  { icon: FaUtensils,   title: "Nutritious Meals",            desc: "Balanced, nutritious meals prepared under hygienic conditions — breakfast, lunch, snacks, and dinner for growing children." },
  { icon: FaBook,       title: "Supervised Study Sessions",   desc: "Structured evening study hours with faculty supervision, ensuring students stay on track and receive help when needed." },
  { icon: FaUserShield, title: "Dedicated Wardens & Mentors", desc: "Experienced wardens and mentors available round-the-clock for the safety, well-being, and emotional support of every student." },
];

export default function ResidentialSection() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest mb-3">Residential Life</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-5">
              A Home Away <span className="text-brand-gold">From Home</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Our residential program is designed to provide students with a structured, nurturing, and enriching environment that complements their academic journey. Every aspect of residential life at MNRS is thoughtfully managed to ensure students thrive — academically, physically, and emotionally.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {RESIDENTIAL_FEATURES.map((f, i) => (
                <AnimatedCard key={f.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-dark text-sm mb-1">{f.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Visual */}
          <AnimatedCard delay={0.2}>
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-blue rounded-2xl p-10 text-center text-white">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="font-serif text-2xl font-bold mb-3">Residential Program</h3>
                <p className="text-green-100 text-sm leading-relaxed mb-6">
                  A fully supervised, safe, and enriching residential experience for students from across India.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: "24/7", l: "Supervision" },
                    { v: "3+",   l: "Meals Daily" },
                    { v: "Safe", l: "Environment" },
                    { v: "TM",   l: "Daily Practice" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/10 rounded-xl p-3">
                      <p className="font-stat text-xl font-bold tracking-wide text-brand-gold">{s.v}</p>
                      <p className="text-xs text-green-100 font-sans">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
