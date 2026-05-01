"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaEnvelopeOpenText } from "react-icons/fa";

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
            className="fixed inset-0 z-40 bg-[#0b1c37]/45 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(11,63,145,0.28)]">
              <div className="relative bg-[linear-gradient(160deg,#0b3f91_0%,#0f61e5_52%,#69b5ff_100%)] px-6 pb-10 pt-8 text-center text-white">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/18 text-white transition-colors hover:bg-white/28"
                  aria-label="Close newsletter popup"
                >
                  <IoClose size={18} />
                </button>

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/18 shadow-[0_12px_30px_rgba(3,27,73,0.22)]">
                  <FaEnvelopeOpenText className="text-4xl text-white" />
                </div>
                <div className="absolute bottom-[-0.65rem] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 rounded-[4px] bg-white" />
              </div>

              <div className="px-6 pb-7 pt-7 text-center">
                <h3 className="font-serif text-[2rem] font-bold leading-none text-[#0d1b2a]">
                  Subscribe!
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#5c6d86]">
                  Stay close to MNRS with school updates, events, notices, and campus highlights in your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="mt-5 space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="w-full rounded-2xl border border-[#d8e3f4] bg-[#f7f9fc] px-4 py-3 text-center text-sm text-[#10213a] outline-none transition-colors placeholder:text-[#91a3bc] focus:border-[#0f61e5]"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mx-auto inline-flex min-w-[9rem] items-center justify-center rounded-full bg-[#0f61e5] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,97,229,0.28)] transition-all duration-300 hover:bg-[#084db8] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send"}
                  </button>
                </form>

                {success ? (
                  <p className="mt-4 text-sm font-medium text-[#0f61e5]">{success}</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
