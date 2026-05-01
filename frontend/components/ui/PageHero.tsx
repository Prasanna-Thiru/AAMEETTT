"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({ title, highlight, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative min-h-[32vh] sm:min-h-[38vh] flex items-end overflow-hidden bg-brand-dark">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-green-dark opacity-90" />
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

      {/* Decorative circles — hidden on mobile */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl hidden sm:block" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-green/10 blur-3xl hidden sm:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 sm:pb-14 pt-28 sm:pt-32">
        {breadcrumb && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-brand-gold text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2 sm:mb-3"
          >
            {breadcrumb}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          {title}{" "}
          {highlight && <span className="text-brand-gold">{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
