"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGraduationCap, FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home",       href: "/" },
  { label: "About Us",   href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Faculty",    href: "/faculty" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Contact",    href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student/dashboard") ||
    pathname?.startsWith("/parent/dashboard") ||
    pathname?.startsWith("/faculty/dashboard")
  ) {
    return null;
  }

  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="MNRS Logo" className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
              <div>
                <p className="font-serif font-bold text-white text-lg leading-none">MNRS</p>
                <p className="text-brand-gold text-xs font-medium">Maharishi Vidya Mandir</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 italic mb-5 leading-relaxed">
              "Educating the Mind.<br />Awakening the Potential."
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, label: "Facebook",  href: "#" },
                { icon: FaInstagram, label: "Instagram", href: "#" },
                { icon: FaYoutube,   label: "YouTube",   href: "#" },
                { icon: FaTwitter,   label: "Twitter",   href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-300 text-gray-400"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="text-brand-gold mt-0.5 shrink-0" />
                <span>AMET Knowledge Park,<br />ECR – Thenpattinam</span>
              </li>
              <li className="flex gap-3 text-sm">
                <FaPhone className="text-brand-gold mt-0.5 shrink-0" />
                <a href="tel:+918939199005" className="text-gray-400 hover:text-brand-gold transition-colors">
                  +91 89391 99005
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <FaEnvelope className="text-brand-gold mt-0.5 shrink-0" />
                <a href="mailto:admissions@mnrs.edu.in" className="text-gray-400 hover:text-brand-gold transition-colors">
                  admissions@mnrs.edu.in
                </a>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <FaClock className="text-brand-gold mt-0.5 shrink-0" />
                <span>Mon–Sat: 9:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Admissions CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Admissions 2027–28</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-gray-300 mb-1 font-medium">Classes LKG to Grade 7</p>
              <p className="text-xs text-gray-500 mb-4">Limited seats available. Apply early to secure your child's future.</p>
              <Link href="/admissions" className="btn-primary text-sm w-full justify-center">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Maharishi Vidya Mandir National Residential School. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Part of the Maharishi Vidya Mandir Network
          </p>
        </div>
      </div>
    </footer>
  );
}
