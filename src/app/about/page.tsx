import type { Metadata } from "next";
import PageHero from "@/frontend/components/ui/PageHero";
import MaharishiSection from "@/frontend/components/sections/MaharishiSection";
import { CTABanner, SectionHeader, AnimatedCard, StatCard, FeatureItem } from "@/frontend/components/ui";

export const metadata: Metadata = {
  title: "About MNRS",
  description: "Learn about MNRS's Consciousness-Based Education philosophy, the Maharishi Vidya Mandir network, and our mission to nurture students to excel in life.",
};

const PILLARS = [
  { num: "01", title: "Academic Excellence",              desc: "Rigorous CBSE curriculum delivered through conceptual, skill-based, and experiential learning. Smart classrooms, AI labs, and continuous assessment ensure students are always ahead of the curve." },
  { num: "02", title: "Inner Growth & Emotional Stability", desc: "Daily Transcendental Meditation, mindfulness practices, and structured counseling help students develop emotional intelligence, resilience, and a calm, focused mind." },
  { num: "03", title: "Value-Based Education",            desc: "Character development, ethical reasoning, and community service are woven into the curriculum — shaping students who are not just successful, but genuinely good human beings." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        highlight="MNRS"
        subtitle="Rooted in wisdom. Driven by excellence. Committed to your child's fullest potential."
        breadcrumb="About Us"
      />

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedCard>
              <p className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-5">
                Founded on <span className="text-brand-gold">Timeless Wisdom</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Maharishi Vidya Mandir National Residential School (MNRS) was established under the visionary guidance of <strong className="text-brand-dark">Maharishi Mahesh Yogi</strong>, the founder of Transcendental Meditation and the architect of Consciousness-Based Education (CBE).
                </p>
                <p>
                  MNRS is a proud member of the prestigious <strong className="text-brand-dark">pan-India Maharishi Vidya Mandir (MVM) network</strong> — one of India's most respected chains of schools known for blending academic rigor with inner development.
                </p>
                <p>
                  Situated at the serene AMET Knowledge Park on the East Coast Road (ECR) in Thenpattinam, MNRS offers a unique educational environment where students grow not just academically, but as complete human beings — intellectually sharp, emotionally balanced, and spiritually grounded.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-blue rounded-2xl p-10 text-white text-center">
                <div className="text-6xl mb-5">🕉️</div>
                <h3 className="font-serif text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-green-100 text-base leading-relaxed italic">
                  "To nurture students to excel in life — not just exams — with clarity, creativity, and confidence."
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-pad bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Framework"
            title="Three Pillars of"
            highlight="MNRS Education"
            subtitle="A holistic framework that develops every dimension of a student's being."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => (
              <AnimatedCard key={p.num} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <p className="font-stat text-5xl font-bold tracking-wide text-brand-gold/30 mb-4">{p.num}</p>
                  <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <MaharishiSection />

      {/* MVM Network Stats */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Legacy"
            title="Part of the"
            highlight="MVM Network"
            subtitle="MNRS stands on the shoulders of a legacy built over decades across India."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-brand-dark rounded-2xl p-8">
            <StatCard value="200+" label="MVM Schools Across India" />
            <StatCard value="50+"  label="Years of Educational Excellence" />
            <StatCard value="1L+"  label="Students Transformed" />
            <StatCard value="10 Acres" label="MNRS Green Campus" />
          </div>
        </div>
      </section>

      <CTABanner
        title="Be Part of the MNRS Family"
        subtitle="Admissions open for 2027–2028. Limited seats for LKG to Grade 7."
        primaryLabel="Apply Now"
        primaryHref="/admissions"
        secondaryLabel="Learn About Curriculum"
        secondaryHref="/curriculum"
      />
    </>
  );
}
