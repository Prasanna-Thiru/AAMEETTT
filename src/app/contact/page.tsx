import type { Metadata } from "next";
import PageHero from "@/frontend/components/ui/PageHero";
import ContactForm from "@/frontend/components/forms/ContactForm";
import { CTABanner, AnimatedCard } from "@/frontend/components/ui";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";

const DEFAULT_LOCATION_LABEL = "AMET Knowledge Park, ECR - Thenpattinam";
const MAPS_COORDINATES = "12.4124569,80.0966902";
const LOCATION_LABEL = process.env.NEXT_PUBLIC_ADDRESS?.trim() || DEFAULT_LOCATION_LABEL;
const MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${LOCATION_LABEL} (${MAPS_COORDINATES})`
)}`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAPS_COORDINATES
)}`;
const MAPS_VIEW_URL =
  process.env.NEXT_PUBLIC_MAPS_EMBED_URL?.trim() ||
  `https://www.google.com/maps?q=${encodeURIComponent(`${LOCATION_LABEL} (${MAPS_COORDINATES})`)}&z=17&output=embed`;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    `Contact MNRS for admissions, general enquiries, or facility information. Call +91 89391 99005 or visit ${LOCATION_LABEL}.`,
};

const CONTACT_INFO = [
  {
    icon: FaPhoneAlt,
    title: "Admissions Helpline",
    value: "+91 89391 99005",
    href: "tel:+918939199005",
    color: "bg-brand-green/10 text-brand-green",
  },
  {
    icon: FaMapMarkerAlt,
    title: "School Address",
    value: LOCATION_LABEL,
    href: MAPS_PLACE_URL,
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "admissions@mnrs.edu.in",
    href: "mailto:admissions@mnrs.edu.in",
    color: "bg-brand-gold/10 text-brand-gold",
  },
  {
    icon: FaClock,
    title: "Office Hours",
    value: "Mon-Sat: 9:00 AM - 5:00 PM",
    href: null,
    color: "bg-purple-100 text-purple-600",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in"
        highlight="Touch"
        subtitle="We'd love to hear from you. Reach out for admissions, enquiries, or a campus visit."
        breadcrumb="Contact"
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.08}>
                <div className="card h-full p-6 text-center">
                  <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                    <item.icon className="text-xl" />
                  </div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">{item.title}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-green"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-brand-dark">{item.value}</p>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <AnimatedCard>
              <div className="card p-8">
                <h2 className="mb-2 font-serif text-2xl font-bold text-brand-dark">
                  Send Us a <span className="text-brand-gold">Message</span>
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  Fill in the form and our team will get back to you promptly.
                </p>
                <ContactForm locationLabel={LOCATION_LABEL} locationUrl={MAPS_PLACE_URL} />
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.15}>
              <div className="flex h-full flex-col">
                <h2 className="mb-2 font-serif text-2xl font-bold text-brand-dark">
                  Find <span className="text-brand-gold">Us</span>
                </h2>
                <p className="mb-4 text-sm text-gray-500">{LOCATION_LABEL}</p>
                <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
                  <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark shadow-sm">
                    Campus View
                  </div>
                  <iframe
                    src={MAPS_VIEW_URL}
                    className="h-full min-h-[400px] w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`MNRS Location - ${LOCATION_LABEL}`}
                  />
                </div>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-4 justify-center"
                >
                  Get Directions
                </a>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Visit?"
        subtitle="Schedule a campus tour and see MNRS for yourself. We welcome families every weekday."
        primaryLabel="Call +91 89391 99005"
        primaryHref="tel:+918939199005"
        secondaryLabel="Apply for Admissions"
        secondaryHref="/admissions"
      />
    </>
  );
}
