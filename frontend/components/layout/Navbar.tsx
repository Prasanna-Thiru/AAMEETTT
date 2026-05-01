"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { HiMenu, HiX } from "react-icons/hi";
import { FaArrowRightToBracket, FaGraduationCap, FaPhone } from "react-icons/fa6";
import {
  FaAddressBook,
  FaBookOpen,
  FaBuilding,
  FaChalkboardTeacher,
  FaHome,
  FaImages,
  FaInfoCircle,
  FaWpforms,
} from "react-icons/fa";

type NavLink = {
  label: string;
  href: string;
  icon: IconType;
};

type PortalRole = "student" | "parent" | "faculty";

type NavUser = {
  role?: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "About", href: "/about", icon: FaInfoCircle },
  { label: "Admissions", href: "/admissions", icon: FaWpforms },
  { label: "Curriculum", href: "/curriculum", icon: FaBookOpen },
  { label: "Faculty", href: "/faculty", icon: FaChalkboardTeacher },
  { label: "Facilities", href: "/facilities", icon: FaBuilding },
  { label: "Gallery", href: "/gallery", icon: FaImages },
  { label: "Contact", href: "/contact", icon: FaAddressBook },
];

const HEADER_SCROLL_SHADOW = "0 2px 10px rgba(0, 0, 0, 0.08)";
const PREFETCH_ROUTES = [...NAV_LINKS.map((link) => link.href), "/login"];
const DASHBOARD_BY_ROLE: Record<PortalRole, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  faculty: "/faculty/dashboard",
};

function getDashboardHref(user: NavUser | null) {
  if (user?.role === "student" || user?.role === "parent" || user?.role === "faculty") {
    return DASHBOARD_BY_ROLE[user.role];
  }

  return "/login";
}

function isPortalUser(user: NavUser | null) {
  return user?.role === "student" || user?.role === "parent" || user?.role === "faculty";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const hidePublicChrome =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student/dashboard") ||
    pathname?.startsWith("/parent/dashboard") ||
    pathname?.startsWith("/faculty/dashboard");
  const dashboardHref = getDashboardHref(user);
  const showDashboardLink = isPortalUser(user);

  useEffect(() => {
    const checkAuth = async () => {
      setUser(null);

      try {
        const res = await axios.get("/api/auth/me");
        if (res.data?.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const prefetchTimer = window.setTimeout(() => {
      PREFETCH_ROUTES.forEach((href) => router.prefetch(href));
    }, 1200);

    return () => window.clearTimeout(prefetchTimer);
  }, [router]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (hidePublicChrome) {
    return null;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white transition-[padding,box-shadow,border-color] duration-300 ease-in-out ${
          scrolled ? "py-2" : "py-3 sm:py-4"
        }`}
        style={{ boxShadow: scrolled ? HEADER_SCROLL_SHADOW : "none" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group shrink-0">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="MNRS Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
              <div className="leading-tight">
                <p className="font-serif text-base font-bold leading-none text-[#1a1a1a] sm:text-lg">
                  MNRS
                </p>
                <p className="text-[10px] font-medium text-brand-green sm:text-xs">
                  Maharishi Vidya Mandir
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  aria-current={active ? "page" : undefined}
                  className={`relative pb-1 text-sm transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-gold after:transition-all after:duration-300 after:ease-in-out ${
                    active
                      ? "font-semibold text-brand-green after:w-full after:bg-brand-gold"
                      : "font-medium text-[#222222] after:w-0 after:bg-brand-gold hover:text-brand-green hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+918939199005"
              className="hidden items-center gap-1.5 rounded-lg border border-brand-green/20 px-3 py-2 text-xs font-semibold text-brand-green transition-colors duration-300 hover:border-brand-green hover:bg-brand-cream sm:flex lg:hidden"
            >
              <FaPhone size={11} />
              Call Us
            </a>

            {showDashboardLink ? (
              <Link
                href={dashboardHref}
                className="hidden items-center justify-center rounded-xl border border-brand-green/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-green transition-all duration-300 ease-in-out hover:border-brand-green hover:bg-brand-green hover:text-white lg:inline-flex"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden items-center justify-center rounded-xl border border-brand-green/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-green transition-all duration-300 ease-in-out hover:border-brand-green hover:bg-brand-green hover:text-white lg:inline-flex"
              >
                Login
              </Link>
            )}
            <Link
              href="/admissions"
              className="hidden items-center justify-center rounded-xl bg-gradient-to-r from-brand-green to-brand-blue-light px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:from-brand-green-dark hover:to-brand-green lg:inline-flex"
            >
              Enquire Now
            </Link>

            <button
              className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 lg:hidden ${
                menuOpen
                  ? "border-brand-green bg-brand-green text-white shadow-md"
                  : "border-transparent text-brand-green hover:bg-brand-cream"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-brand-dark/45 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[80vw] max-w-[304px] flex-col overflow-hidden rounded-r-[28px] border-r border-white/60 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] shadow-[0_24px_60px_rgba(10,37,64,0.18)] transition-transform duration-200 ease-out sm:w-[304px] lg:hidden ${
          menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="border-b border-white/15 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-green-dark px-4 pb-4 pt-[calc(env(safe-area-inset-top)+0.85rem)] text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="MNRS Logo" className="h-10 w-10 object-contain bg-white rounded-xl p-1" />
              <div>
                <p className="font-serif text-base font-bold leading-none sm:text-lg">MNRS</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/70">
                  School Portal
                </p>
              </div>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors duration-200 hover:bg-white/15"
              aria-label="Close menu"
            >
              <HiX size={18} />
            </button>
          </div>

          <p className="mt-3 max-w-[14rem] text-xs leading-5 text-white/80">
            Quick access to school pages, admissions, and account actions.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {showDashboardLink ? (
              <Link
                href={dashboardHref}
                onClick={() => setMenuOpen(false)}
                className="col-span-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-gold px-3 py-2.5 text-[13px] font-semibold text-brand-dark transition-colors duration-200 hover:bg-brand-gold-light"
              >
                <FaArrowRightToBracket className="text-xs" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login?mode=login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-gold px-3 py-2.5 text-[13px] font-semibold text-brand-dark transition-colors duration-200 hover:bg-brand-gold-light"
                >
                  <FaArrowRightToBracket className="text-xs" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 py-3">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-blue-light/80">
            Navigation
          </p>
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center gap-2.5 rounded-[18px] border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-brand-green/10 bg-white text-brand-green shadow-[0_10px_26px_rgba(15,97,229,0.08)]"
                      : "border-transparent text-brand-dark/90 hover:border-brand-green/10 hover:bg-white hover:text-brand-green"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-[14px] transition-colors duration-200 ${
                      active
                        ? "bg-brand-cream text-brand-green"
                        : "bg-[#eef5ff] text-brand-blue-light group-hover:bg-brand-cream group-hover:text-brand-green"
                    }`}
                  >
                    <Icon className="text-base" />
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-brand-green/10 bg-brand-cream/70 px-3.5 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3.5">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+918939199005"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-green/15 bg-white px-3 py-2.5 text-[13px] font-semibold text-brand-green transition-colors duration-200 hover:bg-brand-green hover:text-white"
            >
              <FaPhone className="text-xs" />
              Call
            </a>
            <Link
              href="/admissions"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-3 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-brand-green-dark"
            >
              <FaWpforms className="text-xs" />
              Enquire
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
