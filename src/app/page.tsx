import type { Metadata } from "next";
import HeroSection from "@/frontend/components/sections/HeroSection";
import WhyChooseSection from "@/frontend/components/sections/WhyChooseSection";
import MaharishiSection from "@/frontend/components/sections/MaharishiSection";
import ResidentialSection from "@/frontend/components/sections/ResidentialSection";
// import PromotionalLoginModalWrapper from "@/frontend/components/modals/PromotionalLoginModalWrapper";
import { CTABanner } from "@/frontend/components/ui";
import { MissionIcon, VisionIcon, ValuesIcon } from "@/frontend/components/ui/ArtIcons";
import Link from "next/link";
import { FaLeaf, FaGraduationCap, FaRobot, FaTrophy } from "react-icons/fa";

export const metadata: Metadata = {
  title: "MNRS – Maharishi Vidya Mandir National Residential School",
  description: "Admissions open 2027–2028 for LKG to Grade 7. CBSE curriculum, AI & Robotics Lab, world-class sports, and Consciousness-Based Education at AMET Knowledge Park, ECR.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />

      {/* Vision & Mission Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MissionIcon />, title: "Our Mission", desc: "To nurture students to excel in life — not just exams — with clarity, creativity, and confidence." },
              { icon: <VisionIcon />,  title: "Our Vision",  desc: "To be a beacon of holistic education where every child discovers their fullest potential through modern knowledge and timeless wisdom." },
              { icon: <ValuesIcon />,  title: "Our Values",  desc: "Truth, Non-violence, Discipline, Compassion, Excellence, and Service — lived daily through every interaction at MNRS." },
            ].map((item, i) => (
              <div key={item.title} className="text-center p-8 rounded-2xl border border-gray-100 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                <div className="mb-6 mx-auto flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MaharishiSection />
      <ResidentialSection />

      {/* Facilities Glimpse */}
      <section className="section-pad bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest mb-3">World-Class Infrastructure</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">
              Facilities Built for <span className="text-brand-gold">Excellence</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: FaLeaf,         label: "10-Acre Campus",    color: "bg-brand-green/10 text-brand-green" },
              { icon: FaGraduationCap, label: "Smart Classrooms", color: "bg-brand-blue/10 text-brand-blue" },
              { icon: FaRobot,        label: "AI & Robotics Lab", color: "bg-purple-100 text-purple-600" },
              { icon: FaTrophy,       label: "Sports Complex",    color: "bg-brand-gold/10 text-brand-gold" },
            ].map((f) => (
              <div key={f.label} className="card p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mx-auto mb-3`}>
                  <f.icon className="text-xl" />
                </div>
                <p className="font-semibold text-brand-dark text-sm">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/facilities" className="btn-outline">Explore All Facilities</Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Admissions Open for 2027–2028"
        subtitle="Limited seats available for LKG to Grade 7. Apply early to secure your child's future at MNRS."
        primaryLabel="Apply Now"
        primaryHref="/admissions"
        secondaryLabel="Call +91 89391 99005"
        secondaryHref="tel:+918939199005"
      />

      {/* Promotional Login Modal - Commented out for now */}
      {/* <PromotionalLoginModalWrapper showAfterDelay={3000} showOnce={true} /> */}
    </>
  );
}
