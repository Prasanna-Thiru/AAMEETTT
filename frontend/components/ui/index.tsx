"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({ tag, title, highlight, subtitle, center = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "text-center" : ""}`}>
      {tag && (
        <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2 sm:mb-3 ${light ? "text-brand-gold" : "text-brand-blue-light"}`}>
          {tag}
        </p>
      )}
      <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${light ? "text-white" : "text-brand-dark"}`}>
        {title}{" "}
        {highlight && <span className="text-brand-gold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-gray-300" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Animated Card ────────────────────────────────────────────────────────────
interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: delay * 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="text-center p-4 sm:p-6">
      {icon && <div className="text-brand-gold text-2xl sm:text-3xl mb-2 sm:mb-3 flex justify-center">{icon}</div>}
      <p className="font-stat text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-brand-gold mb-1">{value}</p>
      <p className="text-xs sm:text-sm text-gray-400 font-medium leading-snug">{label}</p>
    </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
interface CTABannerProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTABanner({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-blue py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-green-100 text-sm sm:text-base">{subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link href={primaryHref} prefetch={true} className="btn-primary w-full sm:w-auto justify-center">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} prefetch={true} className="btn-secondary w-full sm:w-auto justify-center">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Feature List Item ────────────────────────────────────────────────────────
export function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-600">
      <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
        <svg className="w-3 h-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
      {text}
    </li>
  );
}
