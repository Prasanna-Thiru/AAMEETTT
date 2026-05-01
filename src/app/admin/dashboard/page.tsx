"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaUserGraduate, FaEnvelope, FaChalkboardTeacher, FaImages, FaSpinner } from "react-icons/fa";

interface Stats {
  admissions: number;
  contacts: number;
  faculty: number;
  gallery: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ admissions: 0, contacts: 0, faculty: 0, gallery: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [admRes, conRes, facRes, galRes] = await Promise.all([
          axios.get("/api/admissions"),
          axios.get("/api/contact"),
          axios.get("/api/faculty"),
          axios.get("/api/gallery"),
        ]);
        setStats({
          admissions: admRes.data.data?.length || 0,
          contacts:   conRes.data.data?.length || 0,
          faculty:    facRes.data.data?.length || 0,
          gallery:    galRes.data.data?.length || 0,
        });
      } catch (err: any) {
        if (err.response?.status === 401) router.push("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-brand-green text-3xl" />
      </div>
    );
  }

  const CARDS = [
    { label: "Admission Leads",   value: stats.admissions, icon: FaUserGraduate,       color: "bg-blue-500",   href: "/admin/admissions" },
    { label: "Contact Enquiries", value: stats.contacts,   icon: FaEnvelope,           color: "bg-green-500",  href: "/admin/admissions" },
    { label: "Faculty Members",   value: stats.faculty,    icon: FaChalkboardTeacher,  color: "bg-purple-500", href: "/admin/faculty" },
    { label: "Gallery Items",     value: stats.gallery,    icon: FaImages,             color: "bg-amber-500",  href: "/admin/gallery" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-brand-dark mb-1">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">Here's an overview of your school website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                  <card.icon className="text-white text-xl" />
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{card.label}</span>
              </div>
              <p className="font-stat text-3xl font-bold tracking-wide text-brand-dark">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="font-serif text-xl font-bold text-brand-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/admissions" className="btn-primary justify-center">
            View Admissions
          </Link>
          <Link href="/admin/faculty" className="btn-outline justify-center">
            Manage Faculty
          </Link>
          <Link href="/admin/gallery" className="btn-outline justify-center">
            Manage Gallery
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-br from-brand-green-dark to-brand-blue rounded-2xl p-8 text-white">
        <h3 className="font-serif text-xl font-bold mb-2">Need Help?</h3>
        <p className="text-green-100 text-sm mb-4">
          Check the README.md file for detailed documentation on managing content, adding faculty, and uploading gallery items.
        </p>
        <a href="/" target="_blank" className="btn-secondary text-sm">
          View Public Website
        </a>
      </div>
    </div>
  );
}
