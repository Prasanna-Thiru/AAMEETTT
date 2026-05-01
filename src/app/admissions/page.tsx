import type { Metadata } from "next";
import PageHero from "@/frontend/components/ui/PageHero";
import AdmissionForm from "@/frontend/components/forms/AdmissionForm";
import { CTABanner, AnimatedCard, SectionHeader } from "@/frontend/components/ui";
import { FaCalendarAlt, FaChild, FaExclamationCircle, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Admissions 2027–28",
  description: "Apply for admissions at MNRS for 2027–2028. Classes LKG to Grade 7. Limited seats. Call +91 89391 99005.",
};

const STEPS = [
  { num: 1, title: "Submit Application Form",        desc: "Fill out the online application form with your child's details and the class you're applying for. Our team reviews every application personally." },
  { num: 2, title: "Student Interaction / Assessment", desc: "A friendly interaction session with the student to understand their strengths, interests, and readiness. This is a conversation — not a stressful exam." },
  { num: 3, title: "Admission Confirmation",          desc: "Upon successful interaction, receive your admission confirmation letter, fee structure, and onboarding details. Welcome to the MNRS family!" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        highlight="2027–2028"
        subtitle="Secure your child's future at MNRS. Limited seats available for LKG to Grade 7."
        breadcrumb="Admissions"
      />

      {/* Info Cards */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              { icon: FaCalendarAlt,      label: "Academic Year",   value: "2027 – 2028",       color: "text-brand-blue" },
              { icon: FaChild,            label: "Classes",         value: "LKG to Grade 7",    color: "text-brand-green" },
              { icon: FaExclamationCircle, label: "Seats",          value: "Limited — Apply Early", color: "text-amber-500" },
              { icon: FaPhoneAlt,         label: "Helpline",        value: "+91 89391 99005",   color: "text-brand-gold" },
            ].map((item, i) => (
              <AnimatedCard key={item.label} delay={i * 0.08}>
                <div className="card p-6 text-center h-full">
                  <item.icon className={`text-2xl ${item.color} mx-auto mb-3`} />
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="font-serif font-bold text-brand-dark text-sm">{item.value}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Admission Process Timeline */}
          <SectionHeader
            tag="How to Apply"
            title="Admission"
            highlight="Process"
            subtitle="A simple, transparent three-step journey to joining the MNRS family."
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Connector line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-brand-green/20 hidden md:block" />
            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <AnimatedCard key={step.num} delay={i * 0.12}>
                  <div className="flex gap-6 items-start">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-brand-green flex items-center justify-center shrink-0 shadow-lg">
                      <span className="font-serif text-2xl font-bold text-white">{step.num}</span>
                    </div>
                    <div className="card p-6 flex-1">
                      <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-pad bg-brand-cream" id="apply">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Apply Online"
            title="Submit Your"
            highlight="Application"
            subtitle="Fill in the form below and our admissions team will reach out within 24 hours."
          />
          <AnimatedCard>
            <div className="card p-8">
              <AdmissionForm />
            </div>
          </AnimatedCard>
        </div>
      </section>

      <CTABanner
        title="Prefer to Talk?"
        subtitle="Our admissions counselors are available Monday to Saturday, 9 AM – 5 PM."
        primaryLabel="Call +91 89391 99005"
        primaryHref="tel:+918939199005"
        secondaryLabel="Learn About Curriculum"
        secondaryHref="/curriculum"
      />
    </>
  );
}
