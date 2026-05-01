"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRightLong,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { AUTH_REDIRECTS, AuthMode, ROLE_OPTIONS, UserRole } from "./auth-config";

type Variant = "page" | "floating";

interface AuthPanelProps {
  variant?: Variant;
  onSuccess?: () => void;
}

interface SignupFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  rollNumber: string;
  className: string;
  parentEmail: string;
  phone: string;
  childrenNames: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  imageUrl: string;
}

const DEFAULT_SIGNUP_FORM: SignupFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  rollNumber: "",
  className: "",
  parentEmail: "",
  phone: "",
  childrenNames: "",
  designation: "",
  subject: "",
  qualification: "",
  experience: "",
  bio: "",
  imageUrl: "",
};

const MODE_LABELS: Record<AuthMode, string> = {
  login: "Welcome back",
  forgot: "Recover access",
  reset: "Reset password",
};

const QUERY_MESSAGES: Record<string, string> = {
  "google-config": "Google login is not configured yet. Add Google client keys to enable it.",
  "google-invalid-request": "The Google sign-in request was incomplete. Please try again.",
  "google-callback": "Google sign-in could not be completed. Please try again.",
  "google-state": "Google sign-in expired. Please start again.",
  "google-token": "Google sign-in could not retrieve your access token. Please try again.",
  "google-profile": "We could not read your Google profile. Please try again.",
  "google-database": "Google sign-in worked, but the portal database could not be reached.",
  "google-session": "Google sign-in worked, but the portal session could not be created.",
  "google-unavailable": "Google sign-in is temporarily unavailable. Please try again shortly.",
  "google-no-account": "We found your Google account, but no portal account exists yet. Please contact the school admin for login access.",
  "google-prefill": "Please contact the school admin to create your portal login.",
  "student-not-approved": "This student email is not approved for portal access yet. Please contact the school office.",
};

function isUserRole(value: string | null): value is UserRole {
  return value === "student" || value === "parent" || value === "faculty";
}

function isAuthMode(value: string | null): value is AuthMode {
  return value === "login" || value === "forgot" || value === "reset";
}

export default function AuthPanel({ variant = "page", onSuccess }: AuthPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFloating = variant === "floating";

  const [role, setRole] = useState<UserRole>("student");
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [signupForm, setSignupForm] = useState<SignupFormState>(DEFAULT_SIGNUP_FORM);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [providerHint, setProviderHint] = useState("");

  const selectedRole = ROLE_OPTIONS.find((option) => option.id === role) ?? ROLE_OPTIONS[0];
  const SelectedIcon = selectedRole.icon;

  useEffect(() => {
    const queryRole = searchParams.get("role");
    const queryMode = searchParams.get("mode");
    const queryEmail = searchParams.get("email") || "";
    const queryName = searchParams.get("name") || "";
    const queryToken = searchParams.get("token") || "";
    const queryProvider = searchParams.get("provider") || "";
    const queryError = searchParams.get("error");
    const queryNotice = searchParams.get("notice");

    if (isUserRole(queryRole)) setRole(queryRole);
    if (isAuthMode(queryMode)) setMode(queryMode);
    if (queryMode === "signup") setMode("login");

    if (queryEmail) {
      setLoginEmail(queryEmail);
      setForgotEmail(queryEmail);
      setSignupForm((prev) => ({ ...prev, email: queryEmail }));
    }

    if (queryName) {
      setSignupForm((prev) => ({ ...prev, name: queryName }));
    }

    if (queryToken) setResetToken(queryToken);
    if (queryProvider === "google") {
      setProviderHint("Google has filled what it can. Complete the remaining fields to continue.");
    }

    if (queryError && QUERY_MESSAGES[queryError]) {
      setError(QUERY_MESSAGES[queryError]);
    } else if (queryNotice && QUERY_MESSAGES[queryNotice]) {
      setSuccess(QUERY_MESSAGES[queryNotice]);
    }
  }, [searchParams]);

  const resetFeedback = () => {
    setError("");
    setSuccess("");
  };

  const switchMode = (nextMode: AuthMode) => {
    resetFeedback();
    setProviderHint("");
    setMode(nextMode);
  };

  const updateSignupField = (field: keyof SignupFormState, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAuthSuccess = (redirectTo?: string) => {
    onSuccess?.();
    router.push(redirectTo || AUTH_REDIRECTS[role]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setSubmitting(true);

    try {
      const response = await axios.post(`/api/auth/${role}/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      handleAuthSuccess(response.data.redirectTo || AUTH_REDIRECTS[role]);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to sign you in right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setSubmitting(true);

    try {
      const response = await axios.post("/api/auth/request-reset", {
        role,
        email: forgotEmail,
      });

      setSuccess(response.data.message || "If the account exists, a reset link has been sent.");
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to send a reset link right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (resetPassword !== resetConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post("/api/auth/reset-password", {
        role,
        token: resetToken,
        password: resetPassword,
      });

      setSuccess(response.data.message || "Your password has been updated.");
      setMode("login");
      setLoginPassword("");
      setResetPassword("");
      setResetConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to reset your password right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleContinue = () => {
    resetFeedback();
    window.location.href = `/api/auth/google?role=${role}&intent=login`;
  };

  const fieldShell =
    "flex h-12 items-center gap-3 rounded-lg border border-[#d6e4f7] bg-white px-3.5 shadow-[0_8px_22px_rgba(43,84,145,0.05)] transition focus-within:border-[#1d4ed8] focus-within:bg-white focus-within:shadow-[0_14px_28px_rgba(29,78,216,0.14)]";
  const textInputClass =
    "w-full bg-transparent text-sm font-medium text-[#10213a] outline-none placeholder:text-[#91a0b8]";
  const plainInputClass =
    "h-12 w-full rounded-lg border border-[#d6e4f7] bg-white px-3.5 text-sm font-medium text-[#10213a] shadow-[0_8px_22px_rgba(43,84,145,0.05)] outline-none transition placeholder:text-[#91a0b8] focus:border-[#1d4ed8] focus:bg-white focus:shadow-[0_14px_28px_rgba(29,78,216,0.14)]";
  const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] text-[#50627f]";
  const submitClass =
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white shadow-[0_16px_30px_rgba(21,101,192,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(21,101,192,0.3)] disabled:cursor-not-allowed disabled:opacity-60";

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-3">
      <label className="block">
        <span className={labelClass}>Email Address</span>
        <div className={fieldShell}>
          <FaEnvelope className="shrink-0 text-[#3f6fd2]" />
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            placeholder="Enter email id"
            autoComplete="off"
            className={textInputClass}
          />
        </div>
      </label>

      <label className="block">
        <span className={labelClass}>Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-[#3f6fd2]" />
          <input
            type={showLoginPassword ? "text" : "password"}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            placeholder="Enter password"
            autoComplete="new-password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowLoginPassword((prev) => !prev)}
            className="shrink-0 text-[#61748f] transition hover:text-[#1d4ed8]"
            aria-label={showLoginPassword ? "Hide password" : "Show password"}
          >
            {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <button type="submit" disabled={submitting} className={submitClass} style={{ backgroundColor: selectedRole.accent }}>
        {submitting ? "Signing in..." : `Continue as ${selectedRole.label}`}
        <FaArrowRightLong className="text-xs" />
      </button>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleForgot} className="space-y-3">
      <label className="block">
        <span className={labelClass}>Registered Email</span>
        <div className={fieldShell}>
          <FaEnvelope className="shrink-0 text-[#3f6fd2]" />
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
            placeholder="registered email"
            className={textInputClass}
          />
        </div>
      </label>

      <button type="submit" disabled={submitting} className={submitClass} style={{ backgroundColor: selectedRole.accent }}>
        {submitting ? "Sending link..." : "Send Reset Link"}
        <FaArrowRightLong className="text-xs" />
      </button>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleReset} className="space-y-3">
      <label className="block">
        <span className={labelClass}>New Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-[#3f6fd2]" />
          <input
            type={showResetPassword ? "text" : "password"}
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            required
            minLength={8}
            placeholder="new password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowResetPassword((prev) => !prev)}
            className="shrink-0 text-[#61748f] transition hover:text-[#1d4ed8]"
            aria-label={showResetPassword ? "Hide password" : "Show password"}
          >
            {showResetPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <label className="block">
        <span className={labelClass}>Confirm New Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-[#3f6fd2]" />
          <input
            type={showResetConfirmPassword ? "text" : "password"}
            value={resetConfirmPassword}
            onChange={(e) => setResetConfirmPassword(e.target.value)}
            required
            minLength={8}
            placeholder="repeat password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowResetConfirmPassword((prev) => !prev)}
            className="shrink-0 text-[#61748f] transition hover:text-[#1d4ed8]"
            aria-label={showResetConfirmPassword ? "Hide password" : "Show password"}
          >
            {showResetConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <button type="submit" disabled={submitting} className={submitClass} style={{ backgroundColor: selectedRole.accent }}>
        {submitting ? "Updating..." : "Update Password"}
        <FaArrowRightLong className="text-xs" />
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className={labelClass}>Full Name</span>
          <div className={fieldShell}>
            <FaUser className="shrink-0 text-[#3f6fd2]" />
            <input
              type="text"
              value={signupForm.name}
              onChange={(e) => updateSignupField("name", e.target.value)}
              required
              placeholder="full name"
              className={textInputClass}
            />
          </div>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Email Address</span>
          <div className={fieldShell}>
            <FaEnvelope className="shrink-0 text-[#3f6fd2]" />
            <input
              type="email"
              value={signupForm.email}
              onChange={(e) => updateSignupField("email", e.target.value)}
              required
              placeholder="email"
              className={textInputClass}
            />
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Password</span>
          <div className={fieldShell}>
            <FaLock className="shrink-0 text-[#3f6fd2]" />
            <input
              type={showSignupPassword ? "text" : "password"}
              value={signupForm.password}
              onChange={(e) => updateSignupField("password", e.target.value)}
              required
              minLength={8}
              placeholder="8+ characters"
              className={textInputClass}
            />
            <button
              type="button"
              onClick={() => setShowSignupPassword((prev) => !prev)}
              className="shrink-0 text-[#61748f] transition hover:text-[#1d4ed8]"
              aria-label={showSignupPassword ? "Hide password" : "Show password"}
            >
              {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Confirm Password</span>
          <div className={fieldShell}>
            <FaLock className="shrink-0 text-[#3f6fd2]" />
            <input
              type={showSignupConfirmPassword ? "text" : "password"}
              value={signupForm.confirmPassword}
              onChange={(e) => updateSignupField("confirmPassword", e.target.value)}
              required
              minLength={8}
              placeholder="repeat"
              className={textInputClass}
            />
            <button
              type="button"
              onClick={() => setShowSignupConfirmPassword((prev) => !prev)}
              className="shrink-0 text-[#61748f] transition hover:text-[#1d4ed8]"
              aria-label={showSignupConfirmPassword ? "Hide password" : "Show password"}
            >
              {showSignupConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        {role === "student" ? (
          <>
            <label className="block">
              <span className={labelClass}>Roll Number</span>
              <input
                type="text"
                value={signupForm.rollNumber}
                onChange={(e) => updateSignupField("rollNumber", e.target.value)}
                required
                placeholder="e.g. 2026-014"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Class</span>
              <input
                type="text"
                value={signupForm.className}
                onChange={(e) => updateSignupField("className", e.target.value)}
                required
                placeholder="e.g. Grade 7"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Parent Email</span>
              <input
                type="email"
                value={signupForm.parentEmail}
                onChange={(e) => updateSignupField("parentEmail", e.target.value)}
                placeholder="optional"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Phone</span>
              <div className={fieldShell}>
                <FaPhone className="shrink-0 text-[#3f6fd2]" />
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => updateSignupField("phone", e.target.value)}
                  placeholder="optional"
                  className={textInputClass}
                />
              </div>
            </label>
          </>
        ) : null}

        {role === "parent" ? (
          <>
            <label className="block">
              <span className={labelClass}>Phone Number</span>
              <div className={fieldShell}>
                <FaPhone className="shrink-0 text-[#3f6fd2]" />
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => updateSignupField("phone", e.target.value)}
                  required
                  placeholder="phone number"
                  className={textInputClass}
                />
              </div>
            </label>

            <label className="block">
              <span className={labelClass}>Children Names</span>
              <input
                type="text"
                value={signupForm.childrenNames}
                onChange={(e) => updateSignupField("childrenNames", e.target.value)}
                placeholder="comma separated"
                className={plainInputClass}
              />
            </label>
          </>
        ) : null}

        {role === "faculty" ? (
          <>
            <label className="block">
              <span className={labelClass}>Designation</span>
              <input
                type="text"
                value={signupForm.designation}
                onChange={(e) => updateSignupField("designation", e.target.value)}
                required
                placeholder="Senior Teacher"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Subject</span>
              <input
                type="text"
                value={signupForm.subject}
                onChange={(e) => updateSignupField("subject", e.target.value)}
                required
                placeholder="Mathematics"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Qualification</span>
              <input
                type="text"
                value={signupForm.qualification}
                onChange={(e) => updateSignupField("qualification", e.target.value)}
                required
                placeholder="M.Sc, B.Ed"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Experience</span>
              <input
                type="text"
                value={signupForm.experience}
                onChange={(e) => updateSignupField("experience", e.target.value)}
                required
                placeholder="10 years"
                className={plainInputClass}
              />
            </label>
          </>
        ) : null}
      </div>

      <button type="submit" disabled={submitting} className={submitClass} style={{ backgroundColor: selectedRole.accent }}>
        {submitting ? "Creating account..." : `Create ${selectedRole.label} Account`}
        <FaArrowRightLong className="text-xs" />
      </button>
    </form>
  );

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_30px_90px_rgba(2,20,54,0.34)] ${
        isFloating ? "max-w-[24rem]" : "max-w-[28rem] lg:max-w-[62rem]"
      }`}
    >
      <div className="lg:grid lg:grid-cols-[22rem_1fr]">
        <div className="relative overflow-hidden bg-[linear-gradient(145deg,#0b2a5b_0%,#0f61e5_62%,#38bdf8_130%)] px-5 pb-5 pt-5 text-white lg:flex lg:min-h-[37rem] lg:flex-col lg:p-7">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_31%,rgba(255,255,255,0.16)_31%,rgba(255,255,255,0.16)_39%,transparent_39%,transparent_58%,rgba(255,255,255,0.12)_58%,rgba(255,255,255,0.12)_67%,transparent_67%)]" />
          <div className="absolute -left-24 top-16 h-64 w-64 rotate-45 rounded-lg border border-white/20 bg-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.16)]" />
          <div className="absolute -right-28 bottom-10 h-72 w-72 -rotate-12 rounded-lg border border-white/15 bg-white/10" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <Link href="/" className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-white/15">
              Back
            </Link>
            <span className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">
              MNRS
            </span>
          </div>

          <div className="relative z-10 mt-7 flex items-center gap-3 lg:mt-12">
            <motion.div
              key={role}
              initial={{ rotate: -8, scale: 0.86, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-[0_18px_34px_rgba(0,0,0,0.22)]"
            >
              <SelectedIcon className="text-xl" />
            </motion.div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-100">
                {selectedRole.eyebrow}
              </p>
              <h2 className="mt-1 text-3xl font-black leading-tight text-white">
                {MODE_LABELS[mode]}
              </h2>
            </div>
          </div>

          <motion.p
            key={`${role}-description`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 mt-5 max-w-[18rem] text-sm font-medium leading-6 text-blue-50"
          >
            {selectedRole.description}
          </motion.p>

          <div className="relative z-10 mt-6 hidden rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur lg:block">
            <div className="flex items-center gap-4">
              <img
                src="/residential-program-login-logo.png"
                alt="Residential program logo"
                className="h-20 w-20 shrink-0 rounded-xl border border-white/20 object-cover shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-100">
                  Residential Program
                </p>
                <p className="mt-1 text-sm font-bold leading-5 text-white">
                  A caring campus home for focused learning and growth.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 lg:mt-8">
            <p className="mb-2 hidden text-xs font-bold uppercase tracking-[0.18em] text-blue-100 lg:block">
              Account type
            </p>
            <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-white/10 p-1.5 backdrop-blur lg:grid-cols-1 lg:gap-2">
              {ROLE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const active = option.id === role;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setRole(option.id);
                      setLoginEmail("");
                      setLoginPassword("");
                      resetFeedback();
                    }}
                    className={`relative flex h-11 items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition lg:justify-start lg:px-3 ${
                      active ? "text-blue-700" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="active-role-pill"
                        className="absolute inset-0 rounded-lg bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    ) : null}
                    <Icon className="relative z-10 text-[13px]" />
                    <span className="relative z-10 hidden min-[380px]:inline">{option.label}</span>
                    <span className="relative z-10 min-[380px]:hidden">{option.label.slice(0, 3)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-between gap-3 lg:mt-6 lg:block">
            <p className="mb-2 hidden text-xs font-bold uppercase tracking-[0.18em] text-blue-100 lg:block">
              Form type
            </p>
            <div className="inline-flex rounded-lg bg-white/10 p-1 lg:grid lg:w-full lg:grid-cols-1 lg:gap-2 lg:p-1.5">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  mode === "login" ? "bg-white text-blue-700" : "text-white/80 hover:bg-white/10"
                }`}
              >
                Sign in
              </button>
            </div>

            {mode !== "forgot" && mode !== "reset" ? (
              <button type="button" onClick={() => switchMode("forgot")} className="text-xs font-bold text-blue-50 underline-offset-4 hover:underline lg:mt-4 lg:w-full lg:text-left">
                Forgot password?
              </button>
            ) : (
              <button type="button" onClick={() => switchMode("login")} className="text-xs font-bold text-blue-50 underline-offset-4 hover:underline lg:mt-4 lg:w-full lg:text-left">
                Back to sign in
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#f8fbff] px-5 pb-5 pt-4 lg:flex lg:min-h-[37rem] lg:items-center lg:px-10 lg:py-8">
          <div className="w-full">
            <div className="mb-5 text-center">
              <motion.div
                key={`${role}-${mode}-badge`}
                initial={{ y: 8, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-white text-blue-700 shadow-[0_16px_34px_rgba(29,78,216,0.18)]"
              >
                <SelectedIcon className="text-2xl" />
              </motion.div>
              <h1 className="mt-3 text-2xl font-black uppercase tracking-[0.08em] text-[#15345f]">
                {mode === "forgot" ? "Recover Login" : mode === "reset" ? "Reset Login" : "Login"}
              </h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {selectedRole.label} access for MNRS academic portal
              </p>
            </div>

            <AnimatePresence initial={false}>
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {success}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {providerHint ? (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                {providerHint}
              </div>
            ) : null}

            <motion.div
              key={`${mode}-${role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className=""
            >
              {mode === "login" && renderLoginForm()}
              {mode === "forgot" && renderForgotForm()}
              {mode === "reset" && renderResetForm()}
            </motion.div>

            {mode === "login" ? (
              <>
                <div className="my-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#e4ebf6]" />
                  <span className="text-[11px] font-bold text-[#8a9ab0]">or</span>
                  <div className="h-px flex-1 bg-[#e4ebf6]" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleContinue}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#dbe5f4] bg-white px-4 text-sm font-bold text-[#22314a] shadow-[0_10px_28px_rgba(38,86,168,0.08)] transition hover:border-[#3268d6] hover:text-[#3268d6]"
                >
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
