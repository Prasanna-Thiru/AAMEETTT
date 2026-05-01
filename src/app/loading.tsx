import React from "react";
import { FaGraduationCap } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-brand-green">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-cream shadow-sm">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-brand-green/30"></div>
        <img src="/logo.png" alt="Loading MNRS" className="h-10 w-10 animate-pulse object-contain" />
      </div>
      <p className="animate-pulse font-serif text-lg font-medium text-brand-dark">
        Loading...
      </p>
    </div>
  );
}
