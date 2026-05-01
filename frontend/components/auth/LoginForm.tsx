"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthPanel from "./AuthPanel";

export default function LoginForm() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#dff4ff_0%,#eef6ff_38%,#f8fbff_100%)] pb-10 pt-24 sm:pt-28 lg:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.28, 0.42, 0.28] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-20 top-8 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.18, 1, 1.18], opacity: [0.24, 0.36, 0.24] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -right-28 top-14 h-96 w-96 rounded-full bg-brand-green/20 blur-[110px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-brand-blue-light/15 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(21,101,192,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(21,101,192,0.05)_1px,transparent_1px)] bg-[size:74px_74px] opacity-50" />
      </div>

      <div className="relative mx-auto flex w-full max-w-full items-start justify-center px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-[1180px] overflow-hidden rounded-[34px] border border-white/80 bg-white shadow-[0_40px_140px_rgba(7,24,41,0.18)]"
        >
          <Suspense fallback={null}>
            <AuthPanel variant="page" />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
