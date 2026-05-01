"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BiBell,
  BiBookOpen,
  BiCog,
  BiLogOut,
  BiMenu,
  BiMessageRoundedDots,
  BiSearch,
  BiTask,
  BiX,
} from "react-icons/bi";
import { FaChartLine, FaGraduationCap, FaHouse, FaUserGraduate } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";

interface StudentDashboardProps {
  children?: React.ReactNode;
}

type PortalUser = {
  name?: string;
  email?: string;
  rollNumber?: string;
  class?: string;
  role?: string;
};

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: FaHouse },
  { label: "Subjects", href: "#subjects", icon: BiBookOpen },
  { label: "Attendance", href: "#attendance", icon: MdFactCheck },
  { label: "Assignments", href: "#assignments", icon: BiTask },
  { label: "Grades", href: "#grades", icon: FaChartLine },
  { label: "Messages", href: "#messages", icon: BiMessageRoundedDots },
  { label: "Settings", href: "#settings", icon: BiCog },
];

export default function StudentDashboardLayout({ children }: StudentDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        if (response.data.success && response.data.data?.role === "student") {
          setUser(response.data.data);
        } else if (response.data.data?.role === "parent") {
          router.replace("/parent/dashboard");
        } else if (response.data.data?.role === "faculty") {
          router.replace("/faculty/dashboard");
        } else {
          router.replace("/login?mode=login");
        }
      } catch (err) {
        router.replace("/login?mode=login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.replace("/login?mode=login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-100 border-t-blue-600"
        />
      </div>
    );
  }

  const initials = (user?.name || "Student")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const Sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200/80 bg-white/85 px-4 py-5 shadow-[12px_0_40px_rgba(37,99,235,0.06)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20">
            <FaGraduationCap />
          </span>
          <span>
            <span className="block text-sm font-black text-slate-950">MNRS Learn</span>
            <span className="text-xs font-semibold text-slate-500">Student workspace</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
          aria-label="Close sidebar"
        >
          <BiX size={22} />
        </button>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/student/dashboard";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon className="text-lg" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">Focus Mode</p>
        <p className="mt-2 text-sm font-bold text-slate-900">2 tasks due today</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Finish Math practice before evening study hour.</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
      >
        <BiLogOut />
        Logout
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{Sidebar}</div>

      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-[60] transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {Sidebar}
      </div>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/80 bg-white/80 backdrop-blur-xl">
          <div className="flex min-h-[86px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
              aria-label="Open sidebar"
            >
              <BiMenu size={24} />
            </button>

            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Student Portal</p>
              <h1 className="truncate text-xl font-black text-slate-950">Welcome back, {user?.name || "Student"}</h1>
            </div>

            <div className="relative ml-auto min-w-0 flex-1 sm:max-w-md">
              <BiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search subjects, assignments, grades"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/90 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600">
              <BiBell size={21} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-400" />
            </button>

            <div className="hidden items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-slate-900">{user?.name || "Student"}</span>
                <span className="block truncate text-xs font-semibold text-slate-500">{user?.class || "Grade 7"}</span>
              </span>
            </div>
          </div>
        </header>

        <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
          <main className="min-w-0">{children}</main>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-lg font-black text-white shadow-lg shadow-blue-600/20">
                  {initials}
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-950">{user?.name || "Student"}</h2>
                  <p className="text-sm font-semibold text-slate-500">{user?.rollNumber || "Roll no. pending"}</p>
                </div>
              </div>
              <div className="mt-5 rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-black text-blue-700">Live records only</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                  Timetable is shown from admin entries. Attendance appears after staff marks it.
                </p>
              </div>
            </section>

            <section className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <h2 className="text-base font-black text-slate-950">Portal Status</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                Academic features such as assignments, grades, and messaging are marked as upcoming until the school enables those modules.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
