"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUser, FaSchool, FaLock } from "react-icons/fa";
import { FaUsers, FaClipboardList, FaGraduationCap } from "react-icons/fa6";

interface RoleOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

const ROLES: RoleOption[] = [
  {
    id: "student",
    label: "Student Portal",
    description: "Access Class Schedule & Assignments",
    icon: <FaGraduationCap className="text-3xl" />,
    color: "from-emerald-400 to-teal-500",
    gradient: "from-emerald-500/30 to-teal-500/20",
    features: ["Class Schedule", "Assignments", "Grades", "Attendance"],
  },
  {
    id: "parent",
    label: "Parent Portal",
    description: "Monitor Child's Academic Progress",
    icon: <FaUsers className="text-3xl" />,
    color: "from-blue-400 to-blue-600",
    gradient: "from-blue-500/30 to-blue-600/20",
    features: ["Progress Reports", "Attendance", "Messages", "Events"],
  },
  {
    id: "faculty",
    label: "Faculty Portal",
    description: "Manage Classes & Student Records",
    icon: <FaClipboardList className="text-3xl" />,
    color: "from-purple-400 to-purple-600",
    gradient: "from-purple-500/30 to-purple-600/20",
    features: ["Class Management", "Grading", "Attendance", "Reports"],
  },
];

export default function PortalPreviewSection() {
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
    <section className="relative py-20 bg-gradient-to-b from-[#071829]/50 to-[#0D47A1]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <FaSchool className="text-sm" />
            MNRS Portal
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            Secure Access
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Streamlined login designed to keep everything accessible. Switch between Student, Parent, and Faculty portals seamlessly.
          </p>
        </motion.div>

        {/* Main Portal Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-500/40 via-blue-600/30 to-blue-700/40 backdrop-blur-xl border border-white/15 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-3xl mx-auto mb-12"
        >
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
            >
              <span className="text-xs font-semibold text-white/80">PREVIEW</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentRole ? "bg-brand-gold" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ rotate: 90 }}
              className="text-white/40 cursor-pointer hover:text-white/60 transition-colors"
            >
              ⋯
            </motion.div>
          </div>

          {/* Portal Screenshot Area */}
          <div className="bg-gradient-to-b from-blue-400/20 to-blue-600/20 border border-white/10 rounded-2xl p-6 mb-8 min-h-56 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)`,
              backgroundSize: "20px 20px"
            }} />

            {/* Animated Content Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-center w-full"
              >
                {/* Role Icon */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 mx-auto shadow-lg text-white`}
                >
                  {role.icon}
                </motion.div>

                {/* Role Title */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white font-bold text-lg mb-2"
                >
                  {role.label}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/70 text-sm mb-4"
                >
                  {role.description}
                </motion.p>

                {/* Features Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-3 max-w-xs"
                >
                  {role.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                    >
                      <span className="text-xs text-white/80 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Portal Type Selector */}
          <div className="space-y-3">
            {ROLES.map((roleOption, idx) => (
              <motion.button
                key={roleOption.id}
                onClick={() => {
                  setCurrentRole(idx);
                  setAutoRotate(false);
                }}
                whileHover={{ x: 4 }}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                  currentRole === idx
                    ? "bg-white/15 border-white/30 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleOption.color} flex items-center justify-center text-white`}>
                    {roleOption.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {roleOption.label.replace(" Portal", "").toUpperCase()}
                      </span>
                      {currentRole === idx && (
                        <motion.div
                          layoutId="active-indicator"
                          className="w-2 h-2 bg-brand-gold rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-white/60 text-xs">{roleOption.description}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <FaUser className="text-2xl" />,
              title: "Role-Based",
              desc: "Student, Parent, Faculty",
              color: "from-emerald-500/30 to-teal-500/20",
              iconBg: "from-emerald-400 to-teal-500",
            },
            {
              icon: <FaLock className="text-2xl" />,
              title: "Secure Auth",
              desc: "Password Recovery",
              color: "from-blue-500/30 to-blue-600/20",
              iconBg: "from-blue-400 to-blue-600",
            },
            {
              icon: <FaSchool className="text-2xl" />,
              title: "Dashboard",
              desc: "Personalized",
              color: "from-purple-500/30 to-purple-600/20",
              iconBg: "from-purple-400 to-purple-600",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${item.color} border border-white/15 rounded-xl p-6 backdrop-blur-sm`}
            >
              <motion.div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-white mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
