"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthPanel from "./AuthPanel";

export default function LoginForm() {
  const formulas = [
    "A+",
    "ABC",
    "Math",
    "Read",
    "Notes",
    "Quiz",
    "Learn",
    "Class",
    "Grade",
    "Write",
    "CBSE",
    "Library",
  ];

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#eef6ff] px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 overflow-hidden bg-[#f8fbff]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.42)_45%,rgba(219,234,254,0.78)_100%)]" />
        <div className="absolute inset-0 opacity-[0.16]">
          {formulas.map((formula, index) => (
            <motion.span
              key={`${formula}-${index}`}
              animate={{ y: [0, -6, 0], rotate: [index % 2 ? -8 : 8, index % 2 ? -5 : 5, index % 2 ? -8 : 8] }}
              transition={{ duration: 6 + (index % 4), repeat: Infinity, delay: index * 0.2 }}
              className="absolute select-none font-serif text-2xl font-black text-blue-800 sm:text-3xl"
              style={{
                left: `${(index * 19) % 92}%`,
                top: `${8 + ((index * 23) % 82)}%`,
              }}
            >
              {formula}
            </motion.span>
          ))}
          <div className="absolute left-[7%] top-[18%] h-28 w-20 rounded-xl border-4 border-blue-700">
            <div className="absolute -top-5 left-4 h-8 w-12 rounded-t-full border-4 border-b-0 border-blue-700" />
            <div className="absolute left-3 top-8 h-2 w-10 rounded-full bg-blue-700" />
            <div className="absolute bottom-3 left-4 h-8 w-12 rounded-md border-4 border-blue-700" />
          </div>
          <div className="absolute left-[50%] top-[22%] h-28 w-5 rotate-[28deg] rounded-full border-4 border-blue-700 bg-white/50">
            <div className="absolute -bottom-5 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[18px] border-l-transparent border-r-transparent border-t-blue-700" />
            <div className="absolute left-1/2 top-4 h-14 w-0.5 -translate-x-1/2 bg-blue-700" />
          </div>
          <div className="absolute right-[12%] top-[55%] h-24 w-20 -rotate-6 rounded-md border-4 border-blue-700">
            <div className="absolute left-3 top-4 h-2 w-12 rounded-full bg-blue-700" />
            <div className="absolute left-3 top-9 h-2 w-10 rounded-full bg-blue-700" />
            <div className="absolute -right-5 top-4 h-24 w-6 rotate-12 rounded-full border-4 border-blue-700" />
          </div>
          <div className="absolute bottom-[12%] left-[14%] h-8 w-32 rotate-12 rounded-md border-4 border-blue-700">
            <div className="absolute inset-y-0 left-5 w-0.5 bg-blue-700" />
            <div className="absolute inset-y-0 left-10 w-0.5 bg-blue-700" />
            <div className="absolute inset-y-0 left-16 w-0.5 bg-blue-700" />
            <div className="absolute inset-y-0 left-24 w-0.5 bg-blue-700" />
          </div>
          <div className="absolute bottom-[20%] right-[28%] h-24 w-16 rotate-6 rounded-lg border-4 border-blue-700 shadow-[12px_12px_0_rgba(29,78,216,0.55)]">
            <div className="absolute left-3 top-4 h-2 w-9 rounded-full bg-blue-700" />
            <div className="absolute left-3 top-9 h-2 w-7 rounded-full bg-blue-700" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full justify-center"
      >
        <Suspense fallback={null}>
          <AuthPanel variant="page" />
        </Suspense>
      </motion.div>
    </section>
  );
}
