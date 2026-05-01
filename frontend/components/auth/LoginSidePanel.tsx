"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGraduationCap, FaChalkboardUser, FaUsers } from "react-icons/fa6";

interface RoleIllustration {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

const ROLES: RoleIllustration[] = [
  {
    id: "student",
    title: "Student",
    description: "Access your classes, assignments, and grades anytime.",
    icon: <FaGraduationCap className="text-6xl" />,
    color: "from-emerald-300 to-emerald-500",
    gradient: "from-emerald-400/40 to-teal-500/20",
    features: ["Schedule", "Assignments", "Grades"],
  },
  {
    id: "faculty",
    title: "Faculty",
    description: "Manage classes and track student progress easily.",
    icon: <FaChalkboardUser className="text-6xl" />,
    color: "from-amber-300 to-orange-500",
    gradient: "from-amber-400/40 to-orange-500/20",
    features: ["Manage Classes", "Grading", "Reports"],
  },
  {
    id: "parent",
    title: "Parent",
    description: "Monitor your child's academic journey with real-time updates.",
    icon: <FaUsers className="text-6xl" />,
    color: "from-pink-300 to-rose-500",
    gradient: "from-pink-400/40 to-rose-500/20",
    features: ["Progress", "Attendance", "Messages"],
  },
];

export default function LoginSidePanel() {
  const [currentRole, setCurrentRole] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const role = ROLES[currentRole];

  return (
    <div className="hidden lg:flex">
      <div className="relative w-full overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#0b3f91_0%,#0f61e5_52%,#69b5ff_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,97,229,0.2)]">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%)]" />
        <div className="absolute bottom-3 right-3 h-24 w-24 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_58%,transparent_70%)]" />
        <div className="absolute left-[-1.5rem] top-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full gap-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              MNRS Portal
            </p>
            <h2 className="text-2xl font-bold leading-snug text-white">
              Secure Access
            </h2>
            <p className="text-xs leading-4 text-blue-50/80">
              Streamlined login for students, parents, and faculty.
            </p>
          </motion.div>

          {/* Animated Role Illustration - Only Current Role Displays */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`role-${currentRole}`}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6 py-8 flex-1"
            >
              {/* Icon Container with Animated Background */}
              <motion.div
                initial={{ rotate: -45 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Rotating background circles - BIGGER */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br ${role.color} opacity-30 blur-2xl`}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-4 w-40 h-40 rounded-full bg-gradient-to-br ${role.color} opacity-40 blur-xl`}
                />

                {/* Main Icon - BIGGER and BRIGHTER */}
                <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-white/40 to-white/20 border border-white/50 flex items-center justify-center text-white shadow-2xl">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-8xl"
                  >
                    {role.icon}
                  </motion.div>
                </div>
              </motion.div>

              {/* Animated Floating Elements - FILLS SPACE */}
              <div className="relative w-full h-40 flex items-center justify-center">
                {/* Center decorative circle */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${role.color} opacity-20 blur-lg`} />
                </motion.div>

                {/* Left floating element */}
                <motion.div
                  animate={{ y: [0, -15, 0], x: [-30, -10, -30] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-1/3"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer">
                    <span className="text-2xl">📚</span>
                  </div>
                </motion.div>

                {/* Right floating element */}
                <motion.div
                  animate={{ y: [0, 15, 0], x: [30, 10, 30] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute right-0 top-1/3"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer">
                    <span className="text-2xl">⭐</span>
                  </div>
                </motion.div>

                {/* Top right floating element */}
                <motion.div
                  animate={{ y: [-20, 5, -20], x: [15, 25, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute right-8 top-0"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                </motion.div>

                {/* Bottom left floating element */}
                <motion.div
                  animate={{ y: [20, -5, 20], x: [-15, -25, -15] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute left-8 bottom-0"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center">
                    <span className="text-xl">→</span>
                  </div>
                </motion.div>
              </div>

              {/* Role Title & Description - SLIDE IN */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center space-y-3"
              >
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{role.title}</h3>
                <p className="text-sm text-white/95 leading-6 drop-shadow-md">
                  {role.description}
                </p>
              </motion.div>

              {/* Features Badges - SLIDE IN with stagger */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {role.features.map((feature, idx) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-4 py-2 text-sm font-bold bg-white/25 border border-white/40 rounded-full text-white/95 backdrop-blur-md shadow-lg hover:bg-white/35 transition-colors"
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              {/* Progress Indicator - SLIDE IN */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-3 mt-2"
              >
                {ROLES.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setCurrentRole(idx);
                      setAutoRotate(false);
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-3 transition-all cursor-pointer ${
                      idx === currentRole
                        ? "w-10 bg-white rounded-full shadow-lg"
                        : "w-3 bg-white/50 rounded-full hover:bg-white/75"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 mt-auto"
          >
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.25)", x: 4 }}
              className="flex items-start gap-3 rounded-lg border border-white/30 bg-white/12 p-3 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/25 shadow-md">
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </motion.svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-md">Role-Based</p>
                <p className="text-xs text-white/90 drop-shadow">Student, Parent, Faculty</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.25)", x: 4 }}
              className="flex items-start gap-3 rounded-lg border border-white/30 bg-white/12 p-3 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/25 shadow-md">
                <motion.svg
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </motion.svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-md">Secure Auth</p>
                <p className="text-xs text-white/90 drop-shadow">Password Recovery</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.25)", x: 4 }}
              className="flex items-start gap-3 rounded-lg border border-white/30 bg-white/12 p-3 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/25 shadow-md">
                <motion.svg
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2a1 1 0 001 1h6a1 1 0 001-1v-2z" />
                </motion.svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-md">Dashboard</p>
                <p className="text-xs text-white/90 drop-shadow">Personalized</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
