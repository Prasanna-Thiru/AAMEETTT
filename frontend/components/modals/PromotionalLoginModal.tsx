"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa6";
import axios from "axios";

interface PromotionalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PromotionalLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: PromotionalLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setShowPassword(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post("/api/auth/student/login", {
          email,
          password,
        });
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          onSuccess?.();
          handleClose();
        }, 1500);
      } else {
        const response = await axios.post("/api/auth/signup", {
          role: "student",
          name: email.split("@")[0],
          email,
          password,
        });
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => {
          onSuccess?.();
          handleClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Main Container - Two Column on Desktop, One Column on Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] min-h-[500px] md:min-h-[550px]">
                {/* Left Side - Educational Image */}
                <div className="hidden md:flex relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-300 to-indigo-400 items-end justify-center p-8">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
                  </div>

                  {/* Educational Image Placeholder - Can be replaced with actual image */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <div className="relative mb-6">
                      {/* Styled Educational Icon/Illustration */}
                      <svg className="w-32 h-32 text-white drop-shadow-lg" viewBox="0 0 200 200" fill="none">
                        {/* Books Stack */}
                        <rect x="50" y="110" width="100" height="20" fill="currentColor" rx="2" />
                        <rect x="50" y="85" width="90" height="20" fill="currentColor" rx="2" />
                        <rect x="50" y="60" width="80" height="20" fill="currentColor" rx="2" />

                        {/* Graduation Cap */}
                        <g>
                          <path d="M100 30 L130 50 L130 70 Q130 85 100 85 Q70 85 70 70 L70 50 Z" fill="currentColor" />
                          <line x1="100" y1="85" x2="100" y2="100" stroke="currentColor" strokeWidth="3" />
                        </g>

                        {/* Learning Path Line */}
                        <path d="M60 120 Q100 105 140 120" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                      </svg>
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">Learn Together</h3>
                      <p className="text-blue-50/90 text-sm">Quality education at your pace</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors group"
                    aria-label="Close modal"
                  >
                    <FaXmark className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>

                  {/* Content Section */}
                  <div className="flex-1">
                    {/* On Mobile - Show Image Placeholder */}
                    <div className="md:hidden mb-6 -mx-6 sm:-mx-8 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 bg-gradient-to-br from-blue-400 via-blue-300 to-indigo-400 rounded-b-2xl">
                      <div className="flex justify-center">
                        <svg className="w-20 h-20 text-white drop-shadow-lg" viewBox="0 0 200 200" fill="none">
                          <rect x="50" y="110" width="100" height="20" fill="currentColor" rx="2" />
                          <rect x="50" y="85" width="90" height="20" fill="currentColor" rx="2" />
                          <rect x="50" y="60" width="80" height="20" fill="currentColor" rx="2" />
                          <g>
                            <path d="M100 30 L130 50 L130 70 Q130 85 100 85 Q70 85 70 70 L70 50 Z" fill="currentColor" />
                            <line x1="100" y1="85" x2="100" y2="100" stroke="currentColor" strokeWidth="3" />
                          </g>
                          <path d="M60 120 Q100 105 140 120" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        </svg>
                      </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? "Welcome Back" : "Start Your Journey"}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        {isLogin
                          ? "Access your academic dashboard and continue learning"
                          : "Join thousands of students learning with us today"}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-12 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200"
                        >
                          <p className="text-xs sm:text-sm text-red-700">{error}</p>
                        </motion.div>
                      )}

                      {/* Success Message */}
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 sm:p-4 rounded-lg bg-green-50 border border-green-200"
                        >
                          <p className="text-xs sm:text-sm text-green-700">{success}</p>
                        </motion.div>
                      )}

                      {/* CTA Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm sm:text-base">
                              {isLogin ? "Sign In to Dashboard" : "Create Your Account"}
                            </span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Toggle Auth Mode */}
                    <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setError("");
                          setSuccess("");
                          setPassword("");
                        }}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors disabled:text-gray-400"
                      >
                        {isLogin ? "Sign Up" : "Sign In"}
                      </button>
                    </p>
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleClose}
                      className="w-full text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base py-2 transition-colors"
                    >
                      No thanks, browse as guest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
