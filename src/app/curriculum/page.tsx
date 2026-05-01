import type { Metadata } from "next";
import PageHero from "@/frontend/components/ui/PageHero";
import { CTABanner, SectionHeader, AnimatedCard, FeatureItem } from "@/frontend/components/ui";
import { FaLightbulb, FaTools, FaChartLine, FaInfinity } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "MNRS offers a CBSE curriculum from LKG to Grade 7, with future expansion to Grade 12. Conceptual, skill-based, and consciousness-integrated learning.",
};

const PHILOSOPHY = [
  { icon: FaLightbulb, title: "Conceptual Learning",                  desc: "We prioritize deep understanding over rote memorization. Students learn the 'why' behind every concept, building a strong foundation that supports lifelong learning and problem-solving." },
  { icon: FaTools,     title: "Skill-Based Education",                desc: "From communication and collaboration to coding and critical thinking — practical skills are embedded into every subject, preparing students for real-world challenges." },
  { icon: FaChartLine, title: "Continuous Assessment & Development",  desc: "Regular formative assessments, project-based evaluations, and personalized feedback ensure every student's progress is tracked and supported — not just at exam time." },
  { icon: FaInfinity,  title: "CBE Integration",                      desc: "Consciousness-Based Education principles are woven into everyday classroom learning — through TM practice, mindful teaching methods, and an environment that nurtures inner development." },
];

const STAGES = [
  {
    label: "Foundation Stage", classes: "LKG – UKG",
    subjects: ["Play-based and activity-driven learning", "Language development (English & Tamil)", "Early numeracy and logical thinking", "Arts, music, and creative expression", "Introduction to TM and mindfulness"],
  },
  {
    label: "Primary Stage", classes: "Grade 1 – 5",
    subjects: ["Core subjects: English, Maths, Science, Social Studies", "Hindi / Tamil as second language", "Computer Science & Digital Literacy", "Art, Craft, Music & Physical Education", "Value Education & TM practice"],
  },
  {
    label: "Middle Stage", classes: "Grade 6 – 7",
    subjects: ["Deepened subject specialization", "Introduction to AI, Robotics & Coding", "Project-based and inquiry learning", "Leadership & life skills programs", "Sports specialization begins"],
  },
];

const CLASSES_CURRENT = ["LKG", "UKG", "1", "2", "3", "4", "5", "6", "7"];
const CLASSES_FUTURE  = ["8", "9", "10", "11", "12"];

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        title="Our"
        highlight="Curriculum"
        subtitle="CBSE excellence enriched with consciousness, creativity, and future-ready skills."
        breadcrumb="Curriculum"
      />

      {/* CBSE Overview */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedCard>
              <p className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest mb-3">CBSE Affiliated</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-5">
                A Curriculum Built for <span className="text-brand-gold">Tomorrow</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                MNRS follows the <strong>Central Board of Secondary Education (CBSE)</strong> curriculum — India's most widely recognized educational framework. Our approach goes beyond textbooks to develop genuine understanding, critical thinking, and a love for learning.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Currently offering classes from <strong>LKG to Grade 7</strong>, with a planned expansion to <strong>Grade 12 (Senior Secondary)</strong> — ensuring students can complete their entire schooling journey at MNRS.
              </p>

              {/* Class Range Visual */}
              <div>
                <p className="text-sm font-semibold text-brand-dark mb-3">Class Range</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {CLASSES_CURRENT.map((c) => (
                    <span key={c} className="w-10 h-10 rounded-lg bg-brand-green text-white text-sm font-bold flex items-center justify-center shadow-sm">
                      {c}
                    </span>
                  ))}
                  {CLASSES_FUTURE.map((c) => (
                    <span key={c} className="w-10 h-10 rounded-lg bg-gray-100 text-gray-400 text-sm font-bold flex items-center justify-center border-2 border-dashed border-gray-200">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex gap-5 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-green inline-block" /> Currently Available</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-dashed border-gray-300 inline-block" /> Planned Expansion</span>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="bg-gradient-to-br from-brand-blue to-brand-green-dark rounded-2xl p-10 text-white">
                <h3 className="font-serif text-2xl font-bold mb-6">Academic Highlights</h3>
                <ul className="space-y-4">
                  {[
                    "CBSE affiliated curriculum",
                    "LKG to Grade 7 (expanding to Grade 12)",
                    "AI & Robotics integrated from Grade 5",
                    "Continuous & Comprehensive Evaluation",
                    "Consciousness-Based Education daily",
                    "Bilingual instruction (English & Tamil)",
                    "Project-based and experiential learning",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-green-100">
                      <FaInfinity className="text-brand-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Academic Philosophy */}
      <section className="section-pad bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="How We Teach"
            title="Academic"
            highlight="Philosophy"
            subtitle="Four principles that define how we teach and how students learn at MNRS."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PHILOSOPHY.map((p, i) => (
              <AnimatedCard key={p.title} delay={i * 0.1}>
                <div className="card p-8 h-full flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <p.icon className="text-brand-green text-xl" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stage-wise */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Stage-Wise Learning"
            title="Age-Appropriate"
            highlight="Curriculum"
            subtitle="Designed for each stage of a child's development."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STAGES.map((s, i) => (
              <AnimatedCard key={s.label} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <div className="bg-brand-green text-white rounded-xl px-4 py-2 inline-block mb-2">
                    <p className="text-xs font-semibold">{s.label}</p>
                  </div>
                  <p className="text-brand-gold font-serif font-bold text-lg mb-4">{s.classes}</p>
                  <ul className="space-y-2.5">
                    {s.subjects.map((sub) => <FeatureItem key={sub} text={sub} />)}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Expanding to Grade 12"
        subtitle="MNRS is committed to being a complete K–12 school. Grades 8–12 will be introduced progressively."
        primaryLabel="Apply for Admissions"
        primaryHref="/admissions"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
