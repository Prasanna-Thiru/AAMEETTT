"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaEnvelopeOpenText, FaPaperPlane } from "react-icons/fa";

interface AuthUser {
  email?: string;
  name?: string;
  role?: string;
}

function hasNewsletterPromptCookie() {
  return document.cookie.split("; ").some((entry) => entry.startsWith("newsletter_prompt="));
}

function clearNewsletterPromptCookie() {
  document.cookie = "newsletter_prompt=; Max-Age=0; path=/; SameSite=Lax";
}

export default function NewsletterPromptModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!hasNewsletterPromptCookie()) return;

    axios
      .get("/api/auth/me")
      .then((response) => {
        const nextUser = response.data.data || {};
        const userEmail = String(nextUser.email || "").toLowerCase();

        if (!userEmail) {
          clearNewsletterPromptCookie();
          return;
        }

        const subscribedKey = `newsletter-subscribed:${userEmail}`;
        if (localStorage.getItem(subscribedKey) === "true") {
          clearNewsletterPromptCookie();
          return;
        }

        setUser(nextUser);
        setEmail(userEmail);
        setOpen(true);
      })
      .catch(() => {
        clearNewsletterPromptCookie();
      });
  }, []);

  const handleClose = () => {
    clearNewsletterPromptCookie();
    setOpen(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("/api/newsletter/subscribe", {
        email,
        name: user?.name || "",
        role: user?.role || "",
        source: "post-login-modal",
      });

      if (email) {
        localStorage.setItem(`newsletter-subscribed:${email.toLowerCase()}`, "true");
      }

      setSuccess(
        response.data.message || "Thanks for subscribing. We’ll keep you posted with school updates."
      );
      clearNewsletterPromptCookie();
      window.setTimeout(() => setOpen(false), 1200);
    } catch (err: any) {
      setSuccess(err.response?.data?.error || "Unable to subscribe right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#06152d]/55 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_34px_90px_rgba(6,21,45,0.34)]">
              <div className="relative overflow-hidden bg-[linear-gradient(145deg,#071d41_0%,#0f61e5_62%,#38bdf8_125%)] px-6 pb-11 pt-8 text-center text-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
                <div className="absolute -left-10 top-8 h-24 w-24 rotate-12 rounded-xl border border-white/20 bg-white/10" />
                <div className="absolute -right-8 bottom-5 h-20 w-20 -rotate-12 rounded-xl border border-white/20 bg-white/10" />
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
                  aria-label="Close newsletter popup"
                >
                  <IoClose size={18} />
                </button>

                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-[0_18px_36px_rgba(3,27,73,0.28)]">
                  <FaEnvelopeOpenText className="text-4xl" />
                </div>
                <p className="relative z-10 mt-4 text-xs font-black uppercase tracking-[0.24em] text-blue-100">
                  School updates
                </p>
              </div>

              <div className="px-6 pb-7 pt-7 text-center sm:px-8">
                <h3 className="font-serif text-[2rem] font-bold leading-none text-[#0d1b2a] sm:text-[2.25rem]">
                  Stay connected
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5c6d86]">
                  Stay close to MNRS with school updates, events, notices, and campus highlights in your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="mt-6 space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="h-12 w-full rounded-lg border border-[#d8e3f4] bg-[#f7f9fc] px-4 text-center text-sm font-semibold text-[#10213a] outline-none transition-colors placeholder:text-[#91a3bc] focus:border-[#0f61e5] focus:bg-white"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mx-auto inline-flex h-12 min-w-[10rem] items-center justify-center gap-2 rounded-lg bg-[#0f61e5] px-6 text-sm font-bold text-white shadow-[0_12px_26px_rgba(15,97,229,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#084db8] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : <><FaPaperPlane className="text-xs" /> Subscribe</>}
                  </button>
                </form>

                {success ? (
                  <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-[#0f61e5]">{success}</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
