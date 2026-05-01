"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";

const HIDDEN_PATH_PREFIXES = ["/login", "/admin", "/student", "/parent", "/faculty"];

export default function LoginPromptModal() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const shouldHideForRoute = HIDDEN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    if (shouldHideForRoute) return;

    let isMounted = true;
    let timer: number | undefined;

    const dismissed = sessionStorage.getItem("floatingAuthDismissed");
    if (dismissed === "true") return;

    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/me");
        if (isMounted) setAuthenticated(true);
      } catch {
        if (!isMounted) return;

        timer = window.setTimeout(() => {
          setVisible(true);
        }, 1200);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [shouldHideForRoute]);

  const handleClose = () => {
    sessionStorage.setItem("floatingAuthDismissed", "true");
    setVisible(false);
  };

  if (shouldHideForRoute || authenticated || !visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-50 w-[min(17.5rem,calc(100vw-1rem))] sm:bottom-5 sm:right-5">
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="pointer-events-auto overflow-hidden rounded-2xl border border-[#d9e5f6] bg-white shadow-[0_16px_34px_rgba(15,97,229,0.16)]"
        >
          <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7a8ca5]">
                Portal Access
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0d1b2a]">
                Login with school credentials
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#7a8ca5] transition-colors hover:bg-[#eef4ff] hover:text-[#0f61e5]"
              aria-label="Close portal access card"
            >
              <IoClose size={18} />
            </button>
          </div>

          <div className="px-4 pb-4">
            <p className="text-xs leading-5 text-[#5f728d]">
              Quick access without covering the page.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <Link
                href="/login?mode=login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f61e5] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#084db8]"
              >
                <FaArrowRightToBracket className="text-sm" />
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
