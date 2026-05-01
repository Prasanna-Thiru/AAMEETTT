"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaOm, FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaImages, FaSignOutAlt, FaBars, FaTimes, FaUsers } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import "@/frontend/styles/globals.css";

const ADMIN_NAV = [
  { label: "Dashboard",  href: "/admin/dashboard",   icon: FaTachometerAlt },
  { label: "Manage Users", href: "/admin/users",     icon: FaUsers },
  { label: "Admissions", href: "/admin/admissions",  icon: FaUserGraduate },
  { label: "Faculty",    href: "/admin/faculty",     icon: FaChalkboardTeacher },
  { label: "Gallery",    href: "/admin/gallery",     icon: FaImages },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't render sidebar on login page
  if (pathname === "/admin") {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Toaster position="top-center" />
        {children}
      </div>
    );
  }

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    toast.success("Logged out.");
    router.push("/admin");
  };

  const Sidebar = () => (
    <aside className="w-64 bg-brand-dark h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MNRS Logo" className="w-9 h-9 object-contain bg-white rounded-md p-0.5" />
          <div>
            <p className="font-serif font-bold text-white text-sm">MNRS Admin</p>
            <p className="text-brand-gold text-xs">Management Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-brand-green text-white shadow-md"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="text-base shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
        <Link href="/" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors mt-1">
          ← Back to Website
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Toaster position="top-right" />
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FaBars size={20} />
            </button>
            <h1 className="font-serif font-bold text-brand-dark text-lg">
              {ADMIN_NAV.find((n) => pathname.startsWith(n.href))?.label || "Admin"}
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
