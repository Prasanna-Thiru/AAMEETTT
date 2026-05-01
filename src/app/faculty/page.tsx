import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/database/lib/db";
import Faculty from "@/database/models/Faculty";
import PageHero from "@/frontend/components/ui/PageHero";
import { CTABanner, SectionHeader, AnimatedCard } from "@/frontend/components/ui";
import { FaChalkboardTeacher, FaAward, FaHeart, FaSpa, FaUserTie, FaArrowRight } from "react-icons/fa";
import type { FacultyMember } from "@/frontend/types";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Meet the dedicated faculty at MNRS — experienced educators committed to holistic mentorship, academic rigor, and student well-being.",
};

export const revalidate = 3600;

const PLACEHOLDER_FACULTY: FacultyMember[] = [
  {
    _id: "principal",
    name: "Dr. Anand Sharma",
    designation: "Principal & Academic Head",
    subject: "School Leadership",
    qualification: "M.Ed, Ph.D (Education)",
    experience: "20+ years",
    order: 0,
    bio: "Dr. Anand Sharma brings over two decades of experience in educational leadership. A firm believer in Consciousness-Based Education, he has guided thousands of students toward academic excellence and inner growth. Under his leadership, MNRS aims to become a benchmark institution for holistic schooling in India.",
  },
  {
    _id: "maths-science",
    name: "Mrs. Priya Venkatesh",
    designation: "Senior Teacher",
    subject: "Mathematics & Science",
    qualification: "M.Sc (Mathematics), B.Ed",
    experience: "12 years",
    order: 1,
    bio: "Mrs. Priya Venkatesh is passionate about making mathematics accessible and enjoyable for every student. Her conceptual teaching approach and use of real-world examples have consistently produced outstanding results in CBSE assessments.",
  },
  {
    _id: "english",
    name: "Mr. Rajesh Kumar",
    designation: "Senior Teacher",
    subject: "English & Languages",
    qualification: "M.A (English Literature), B.Ed",
    experience: "10 years",
    order: 2,
    bio: "Mr. Rajesh Kumar is a dedicated language educator who fosters a love of reading, writing, and communication. He runs the school's literary club and has mentored students who have won state-level essay competitions.",
  },
  {
    _id: "social-studies",
    name: "Ms. Deepa Nair",
    designation: "Teacher",
    subject: "Social Studies",
    qualification: "M.A (History), B.Ed",
    experience: "8 years",
    order: 3,
    bio: "Ms. Deepa Nair brings history and geography to life through storytelling, maps, and project-based learning. She believes that understanding the world around us is the foundation of responsible citizenship.",
  },
  {
    _id: "computer-ai",
    name: "Mr. Arjun Mehta",
    designation: "Lab Instructor",
    subject: "Computer Science & AI",
    qualification: "B.Tech (CS), M.Tech (AI)",
    experience: "6 years",
    order: 4,
    bio: "Mr. Arjun Mehta leads the AI & Robotics Lab at MNRS. With a background in machine learning and software development, he introduces students to coding, robotics, and computational thinking from an early age.",
  },
  {
    _id: "sports",
    name: "Mr. Suresh Babu",
    designation: "Sports Coach",
    subject: "Physical Education & Sports",
    qualification: "B.P.Ed, NIS Certified",
    experience: "10 years",
    order: 5,
    bio: "Mr. Suresh Babu is a certified NIS coach with expertise in cricket, athletics, and swimming. He believes sports build character, discipline, and resilience — qualities that serve students throughout their lives.",
  },
  {
    _id: "arts-music",
    name: "Ms. Kavitha Rajan",
    designation: "Creative Arts Teacher",
    subject: "Arts & Music",
    qualification: "B.F.A, M.F.A (Fine Arts)",
    experience: "7 years",
    order: 6,
    bio: "Ms. Kavitha Rajan nurtures creativity and self-expression through visual arts, music, and craft. She has exhibited her own artwork nationally and brings professional artistic sensibility to every class.",
  },
  {
    _id: "tm-instructor",
    name: "Mr. Prakash Iyer",
    designation: "Certified TM Teacher",
    subject: "Transcendental Meditation",
    qualification: "Certified by Maharishi International University",
    experience: "15 years",
    order: 7,
    bio: "Mr. Prakash Iyer is a certified TM instructor trained at Maharishi International University. He guides students and staff in the daily practice of Transcendental Meditation, fostering inner calm, focus, and emotional balance across the school community.",
  },
];

async function getFaculty(): Promise<FacultyMember[]> {
  try {
    await connectDB();
    const faculty = await Faculty.find().sort({ order: 1 }).lean<FacultyMember[]>();
    return faculty.length > 0 ? faculty : PLACEHOLDER_FACULTY;
  } catch {
    return PLACEHOLDER_FACULTY;
  }
}

const ETHOS = [
  { icon: FaChalkboardTeacher, title: "Holistic Mentorship",  desc: "Our educators go beyond subject delivery — they mentor students in academics, character, emotional well-being, and life skills." },
  { icon: FaAward,             title: "Academic Rigor",       desc: "Every faculty member is selected for deep subject expertise and a passion for teaching, with continuous professional development." },
  { icon: FaHeart,             title: "Student Well-Being",   desc: "Teachers at MNRS are trained to recognize and respond to the emotional and psychological needs of students." },
  { icon: FaSpa,               title: "CBE Practitioners",    desc: "All faculty are trained in Consciousness-Based Education and TM, enabling them to model the inner development they teach." },
];

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <>
      <PageHero
        title="Our"
        highlight="Faculty"
        subtitle="Experienced educators who inspire, mentor, and guide every student to their fullest potential."
        breadcrumb="Faculty"
      />

      {/* Ethos */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Faculty Ethos" title="Teaching as a" highlight="Calling" subtitle="At MNRS, teaching is not just a profession — it is a calling." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ETHOS.map((e, i) => (
              <AnimatedCard key={e.title} delay={i * 0.08}>
                <div className="card p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                    <e.icon className="text-brand-green text-xl" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-dark mb-2">{e.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-pad bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Meet Our Team" title="Our" highlight="Educators" subtitle="Click any profile to learn more about our dedicated faculty members." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculty.map((member, i) => (
              <AnimatedCard key={`${member._id ?? member.name}-${i}`} delay={i * 0.06}>
                <div className="card p-6 text-center hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                  {/* Photo */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden ring-2 ring-brand-green/20 group-hover:ring-brand-gold/40 transition-all duration-300">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUserTie className="text-white text-2xl" />
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-brand-dark text-base mb-1">{member.name}</h3>
                  <p className="text-brand-gold text-xs font-semibold mb-1">{member.subject}</p>
                  <p className="text-gray-400 text-xs mb-3">{member.designation}</p>

                  <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                    <span className="bg-brand-green/10 text-brand-green text-xs px-2 py-0.5 rounded-full">{member.qualification}</span>
                    <span className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-0.5 rounded-full">{member.experience}</span>
                  </div>

                  {/* View Profile Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/faculty/${member._id ?? i}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-brand-green border border-brand-green/30 bg-brand-green/5 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 group-hover:shadow-md"
                    >
                      View Profile
                      <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Join Our Faculty"
        subtitle="We are looking for passionate educators who believe in holistic, consciousness-based education."
        primaryLabel="Send Your CV"
        primaryHref="/contact"
        secondaryLabel="Learn About MNRS"
        secondaryHref="/about"
      />
    </>
  );
}
