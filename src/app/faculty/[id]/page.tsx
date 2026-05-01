import Link from "next/link";
import { connectDB } from "@/database/lib/db";
import Faculty from "@/database/models/Faculty";
import FacultyDetailClient from "./FacultyDetailClient";
import type { FacultyMember } from "@/frontend/types";

// The placeholders used in `/faculty` page
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

async function getFacultyMember(id: string): Promise<FacultyMember | null> {
  try {
    await connectDB();
    // Verify if it is a 24-character hex string (Valid ObjectId)
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      const faculty = await Faculty.findById(id).lean<FacultyMember>();
      if (faculty) {
        // Ensuring _id is a string since lean() returns an ObjectId for _id
        return {
           ...faculty,
           _id: faculty._id ? faculty._id.toString() : id,
        } as FacultyMember;
      }
    }
  } catch (error) {
    console.error("DB Fetch Error", error);
  }

  // Fallback to placeholder if a string id match like "principal" was used
  return PLACEHOLDER_FACULTY.find(f => f._id === id) || null;
}

export default async function FacultyDetailPage({ params }: { params: { id: string } }) {
  const faculty = await getFacultyMember(params.id);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-brand-green/10 max-w-md w-full">
          <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
             {/* Icon */}
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-brand-dark mb-2">Faculty Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">We couldn't find the faculty member you're looking for.</p>
          <Link
            href="/faculty"
            className="btn-primary w-full justify-center"
          >
            Back to Faculty Directory
          </Link>
        </div>
      </div>
    );
  }

  return <FacultyDetailClient faculty={faculty} />;
}
