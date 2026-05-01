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
  login: "Login",
  signup: "Sign Up",
  forgot: "Forgot Password",
  reset: "Reset Password",
};

const QUERY_MESSAGES: Record<string, string> = {
  "google-config": "Google login is not configured yet. Add Google client keys to enable it.",
  "google-invalid-request": "The Google sign-in request was incomplete. Please try again.",
  "google-callback": "Google sign-in could not be completed. Please try again.",
  "google-token": "Google sign-in could not retrieve your access token. Please try again.",
  "google-profile": "We could not read your Google profile. Please try again.",
  "google-unavailable": "Google sign-in is temporarily unavailable. Please try again shortly.",
  "google-no-account": "We found your Google account, but not a matching portal account. Finish signup below.",
  "google-prefill": "Your Google details are ready. Complete the remaining fields to create your account.",
};

function isUserRole(value: string | null): value is UserRole {
  return value === "student" || value === "parent" || value === "faculty";
}

function isAuthMode(value: string | null): value is AuthMode {
  return value === "login" || value === "signup" || value === "forgot" || value === "reset";
}

export default function AuthPanel({ variant = "page", onSuccess }: AuthPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPage = variant === "page";

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

  const shellClassName =
    variant === "floating"
      ? "w-full max-w-[24rem] overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-[0_28px_60px_rgba(15,97,229,0.25)]"
      : "relative w-full overflow-hidden rounded-2xl border-0 bg-transparent lg:flex lg:flex-col lg:h-full";

  const bodyClassName =
    variant === "floating"
      ? "max-h-[78vh] overflow-y-auto px-4 py-4 sm:px-5"
      : "relative px-0 py-0 sm:px-0 lg:flex-1 lg:overflow-y-auto lg:px-0 lg:py-0";

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const payload: Record<string, string | string[]> = {
        role,
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
      };

      if (role === "student") {
        payload.rollNumber = signupForm.rollNumber;
        payload.className = signupForm.className;
        payload.parentEmail = signupForm.parentEmail;
        payload.phone = signupForm.phone;
      }

      if (role === "parent") {
        payload.phone = signupForm.phone;
        payload.childrenNames = signupForm.childrenNames;
      }

      if (role === "faculty") {
        payload.designation = signupForm.designation;
        payload.subject = signupForm.subject;
        payload.qualification = signupForm.qualification;
        payload.experience = signupForm.experience;
        payload.bio = signupForm.bio;
        payload.imageUrl = signupForm.imageUrl;
      }

      const response = await axios.post("/api/auth/signup", payload);
      handleAuthSuccess(response.data.redirectTo || AUTH_REDIRECTS[role]);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to create your account right now.");
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
    const intent = mode === "signup" ? "signup" : "login";
    window.location.href = `/api/auth/google?role=${role}&intent=${intent}`;
  };

  const fieldShell = isPage
    ? "flex items-center gap-3 rounded-[18px] border border-[#d9e3f0] bg-[#f6f9fc] px-4 py-3 shadow-[0_10px_28px_rgba(15,97,229,0.04)] transition-all duration-200 focus-within:border-[#42A5F5] focus-within:bg-white focus-within:shadow-[0_16px_34px_rgba(21,101,192,0.14)]"
    : "flex items-center gap-3 rounded-2xl border-2 border-blue-400 bg-white/15 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all focus-within:border-cyan-300 focus-within:bg-white/25";
  const textInputClass = isPage
    ? "w-full bg-transparent text-sm font-medium text-[#0a2540] outline-none placeholder:text-[#9aa9bf]"
    : "w-full bg-transparent text-sm font-medium text-black outline-none placeholder:text-gray-400";
  const plainInputClass = isPage
    ? "w-full rounded-[18px] border border-[#d9e3f0] bg-[#f6f9fc] px-4 py-3 text-sm font-medium text-[#0a2540] shadow-[0_10px_28px_rgba(15,97,229,0.04)] outline-none transition-all duration-200 placeholder:text-[#9aa9bf] focus:border-[#42A5F5] focus:bg-white focus:shadow-[0_16px_34px_rgba(21,101,192,0.14)]"
    : "w-full rounded-2xl border-2 border-blue-400 bg-white/15 px-4 py-3 text-sm font-medium text-black shadow-[0_8px_24px_rgba(0,0,0,0.1)] outline-none transition-all placeholder:text-gray-400 focus:border-cyan-300 focus:bg-white/25 backdrop-blur-md";
  const submitClass = isPage
    ? "flex w-full items-center justify-center gap-3 rounded-[18px] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(21,101,192,0.24)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_rgba(21,101,192,0.28)]"
    : "flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold text-blue-900 shadow-[0_14px_30px_rgba(0,189,255,0.35)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,189,255,0.4)]";
  const labelClass = isPage
    ? "mb-2 block text-[13px] font-semibold text-[#4f6480]"
    : "mb-2 block text-sm font-semibold text-white/95 drop-shadow-sm";

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className={isPage ? "space-y-3.5" : "space-y-4"}>
      <label className="block">
        <span className={labelClass}>Email Address</span>
        <div className={fieldShell}>
          <FaEnvelope className="shrink-0 text-blue-500" />
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
            className={textInputClass}
          />
        </div>
      </label>

      <label className="block">
        <span className={labelClass}>Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-blue-500" />
          <input
            type={showLoginPassword ? "text" : "password"}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowLoginPassword((prev) => !prev)}
            className="shrink-0 text-blue-600 transition-colors hover:text-blue-800"
            aria-label={showLoginPassword ? "Hide password" : "Show password"}
          >
            {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={submitClass}
        style={{ backgroundColor: selectedRole.accent }}
      >
        {submitting ? "Signing in..." : `Continue as ${selectedRole.label}`}
        <FaArrowRightLong className="text-sm" />
      </button>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleForgot} className={isPage ? "space-y-3.5" : "space-y-4"}>
      <label className="block">
        <span className={labelClass}>Registered Email</span>
        <div className={fieldShell}>
          <FaEnvelope className="shrink-0 text-[#0f61e5]" />
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
            className={textInputClass}
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={submitClass}
        style={{ backgroundColor: selectedRole.accent }}
      >
        {submitting ? "Sending link..." : "Send Reset Link"}
        <FaArrowRightLong className="text-sm" />
      </button>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleReset} className={isPage ? "space-y-3.5" : "space-y-4"}>
      <label className="block">
        <span className={labelClass}>New Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-[#0f61e5]" />
          <input
            type={showResetPassword ? "text" : "password"}
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Enter a new password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowResetPassword((prev) => !prev)}
            className="shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]"
            aria-label={showResetPassword ? "Hide password" : "Show password"}
          >
            {showResetPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <label className="block">
        <span className={labelClass}>Confirm New Password</span>
        <div className={fieldShell}>
          <FaLock className="shrink-0 text-[#0f61e5]" />
          <input
            type={showResetConfirmPassword ? "text" : "password"}
            value={resetConfirmPassword}
            onChange={(e) => setResetConfirmPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Repeat your new password"
            className={textInputClass}
          />
          <button
            type="button"
            onClick={() => setShowResetConfirmPassword((prev) => !prev)}
            className="shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]"
            aria-label={showResetConfirmPassword ? "Hide password" : "Show password"}
          >
            {showResetConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={submitClass}
        style={{ backgroundColor: selectedRole.accent }}
      >
        {submitting ? "Updating password..." : "Update Password"}
        <FaArrowRightLong className="text-sm" />
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className={isPage ? "space-y-3.5" : "space-y-4"}>
      <div className={`grid sm:grid-cols-2 ${isPage ? "gap-3" : "gap-4"}`}>
        <label className="block sm:col-span-2">
          <span className={labelClass}>Full Name</span>
          <div className={fieldShell}>
            <FaUser className="shrink-0 text-[#0f61e5]" />
            <input
              type="text"
              value={signupForm.name}
              onChange={(e) => updateSignupField("name", e.target.value)}
              required
              placeholder="Enter your full name"
              className={textInputClass}
            />
          </div>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Email Address</span>
          <div className={fieldShell}>
            <FaEnvelope className="shrink-0 text-[#0f61e5]" />
            <input
              type="email"
              value={signupForm.email}
              onChange={(e) => updateSignupField("email", e.target.value)}
              required
              placeholder="Enter your email"
              className={textInputClass}
            />
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Password</span>
          <div className={fieldShell}>
            <FaLock className="shrink-0 text-[#0f61e5]" />
            <input
              type={showSignupPassword ? "text" : "password"}
              value={signupForm.password}
              onChange={(e) => updateSignupField("password", e.target.value)}
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className={textInputClass}
            />
            <button
              type="button"
              onClick={() => setShowSignupPassword((prev) => !prev)}
              className="shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]"
              aria-label={showSignupPassword ? "Hide password" : "Show password"}
            >
              {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Confirm Password</span>
          <div className={fieldShell}>
            <FaLock className="shrink-0 text-[#0f61e5]" />
            <input
              type={showSignupConfirmPassword ? "text" : "password"}
              value={signupForm.confirmPassword}
              onChange={(e) => updateSignupField("confirmPassword", e.target.value)}
              required
              minLength={8}
              placeholder="Repeat your password"
              className={textInputClass}
            />
            <button
              type="button"
              onClick={() => setShowSignupConfirmPassword((prev) => !prev)}
              className="shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]"
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
                placeholder="Optional parent email"
                className={plainInputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Phone</span>
              <div className={fieldShell}>
                <FaPhone className="shrink-0 text-[#0f61e5]" />
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => updateSignupField("phone", e.target.value)}
                  placeholder="Optional contact number"
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
                <FaPhone className="shrink-0 text-[#0f61e5]" />
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => updateSignupField("phone", e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  className={textInputClass}
                />
              </div>
            </label>

            <label className="block sm:col-span-2">
              <span className={labelClass}>Children Names</span>
              <input
                type="text"
                value={signupForm.childrenNames}
                onChange={(e) => updateSignupField("childrenNames", e.target.value)}
                placeholder="Separate names with commas"
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
                placeholder="e.g. Senior Teacher"
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
                placeholder="e.g. Mathematics"
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
                placeholder="e.g. M.Sc, B.Ed"
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
                placeholder="e.g. 10 years"
                className={plainInputClass}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={labelClass}>Bio</span>
              <textarea
                value={signupForm.bio}
                onChange={(e) => updateSignupField("bio", e.target.value)}
                rows={3}
                placeholder="Short faculty introduction"
                className={plainInputClass}
              />
            </label>
          </>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={submitClass}
        style={{ backgroundColor: selectedRole.accent }}
      >
        {submitting ? "Creating account..." : `Create ${selectedRole.label} Account`}
        <FaArrowRightLong className="text-sm" />
      </button>
    </form>
  );

  const pagePanelCopy: Record<AuthMode, { title: string; description: string }> = {
    login: {
      title: "Welcome back to your portal",
      description: `Sign in and continue with your ${selectedRole.label.toLowerCase()} dashboard in one calm, focused view.`,
    },
    signup: {
      title: "Let's get you set up",
      description: `It should only take a couple of minutes to activate your ${selectedRole.label.toLowerCase()} access with MNRS.`,
    },
    forgot: {
      title: "Recover your access safely",
      description: "We will send a secure reset link to the email address connected to your school account.",
    },
    reset: {
      title: "Create a fresh password",
      description: "Use a strong password so you can get back into the portal without friction.",
    },
  };

  const pageFormCopy: Record<AuthMode, string> = {
    login: `Use your registered ${selectedRole.label.toLowerCase()} account details to continue.`,
    signup: `Fill in the required details below to create your ${selectedRole.label.toLowerCase()} profile.`,
    forgot: "Tell us the registered email and we will send the next step there.",
    reset: "Set your new password below and then return straight to login.",
  };

  if (isPage) {
    return (
      <div className="grid bg-white lg:min-h-[640px] lg:grid-cols-[0.9fr_1.22fr]">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#38BDF8_0%,#1976D2_42%,#0D47A1_100%)] px-6 py-7 text-white sm:px-8 sm:py-8 lg:flex lg:flex-col lg:justify-between lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_34%)]" />
          <div className="absolute right-[-2.5rem] top-10 h-36 w-36 rounded-full bg-white/14 blur-2xl" />
          <div className="absolute bottom-[-3rem] left-[-2rem] h-44 w-44 rounded-full bg-[#0A2540]/20 blur-3xl" />
          <div className="absolute inset-y-10 right-7 w-px bg-white/18" />

          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/78">
              MNRS Portal
            </p>
            <div className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-medium text-white/88 backdrop-blur-md">
              Secure access for students, parents, and faculty
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-col items-center text-center lg:mt-0">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white/18 shadow-[0_24px_60px_rgba(7,24,41,0.2)] sm:h-44 sm:w-44">
              <div className="absolute inset-4 rounded-full border border-white/18" />
              <div className="absolute inset-10 rounded-full bg-white/10" />
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#ddecff_100%)] text-[#0A2540] shadow-[0_16px_30px_rgba(7,24,41,0.18)] sm:h-32 sm:w-32">
                <SelectedIcon className="text-[3rem]" />
              </div>
            </div>

            <div className="mt-8 max-w-sm">
              <h2 className="font-serif text-[2rem] font-bold leading-tight sm:text-[2.3rem]">
                {pagePanelCopy[mode].title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/88 sm:text-[15px]">
                {pagePanelCopy[mode].description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {ROLE_OPTIONS.map((option) => {
                const Icon = option.icon;

                return (
                  <span
                    key={`${option.id}-page-side`}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                      option.id === role
                        ? "border-white/45 bg-white/24 text-white"
                        : "border-white/18 bg-white/10 text-white/74"
                    }`}
                  >
                    <Icon className="text-[11px]" />
                    {option.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Quick switch removed */}
        </div>

        <div className="bg-white">
          <div className="flex h-full flex-col">
            <div className="border-b border-[#edf2f8] px-5 py-5 sm:px-7 lg:px-10 lg:py-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a9ab0]">
                    Portal Form
                  </p>
                  <h3 className="mt-2 font-serif text-[1.9rem] font-bold leading-tight text-[#071829]">
                    {MODE_LABELS[mode]}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#61748f]">
                    {pageFormCopy[mode]}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]"
                >
                  Need help?
                </Link>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-7 lg:px-10 lg:py-8">
              <div className="mx-auto max-w-[40rem]">
                <div className="rounded-[26px] border border-[#edf2f8] bg-[#fbfdff] p-2 shadow-[0_18px_40px_rgba(10,37,64,0.06)]">
                  <div className="grid grid-cols-3 gap-2">
                    {ROLE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const active = option.id === role;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setRole(option.id);
                            resetFeedback();
                          }}
                          className={`flex items-center justify-center gap-2 rounded-[20px] px-3 py-3 text-sm font-semibold transition-all duration-300 ${
                            active
                              ? "text-white shadow-[0_14px_28px_rgba(21,101,192,0.22)]"
                              : "text-[#58708d] hover:bg-white hover:text-[#0D47A1]"
                          }`}
                          style={{ backgroundColor: active ? option.accent : "transparent" }}
                        >
                          <Icon className="text-sm" />
                          <span className="hidden sm:inline">{option.label}</span>
                          <span className="sm:hidden">{option.label.slice(0, 3)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex rounded-full border border-[#d8e3ef] bg-[#f7fafd] p-1 shadow-[0_10px_24px_rgba(10,37,64,0.05)]">
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                        mode === "login"
                          ? "bg-[#1565C0] text-white"
                          : "text-[#61748f] hover:text-[#0D47A1]"
                      }`}
                    >
                      Login
                    </button>
                  </div>

                  {mode !== "forgot" && mode !== "reset" ? (
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]"
                    >
                      Forgot password?
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]"
                    >
                      Back to login
                    </button>
                  )}
                </div>

                <div className="mt-6 rounded-[30px] border border-[#edf2f8] bg-white p-5 shadow-[0_22px_48px_rgba(10,37,64,0.08)] sm:p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px]"
                      style={{ backgroundColor: selectedRole.softAccent, color: selectedRole.accent }}
                    >
                      <SelectedIcon className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a9ab0]">
                        {selectedRole.eyebrow}
                      </p>
                      <h4 className="mt-1 font-serif text-[1.65rem] font-bold leading-tight text-[#071829]">
                        {MODE_LABELS[mode]}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#61748f]">
                        {selectedRole.description}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {error ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
                        className="mt-5 rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                      >
                        {success}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {providerHint ? (
                    <div className="mt-5 rounded-[18px] border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
                      {providerHint}
                    </div>
                  ) : null}

                  <motion.div
                    key={`${mode}-${role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-5"
                  >
                    {mode === "login" && renderLoginForm()}
                    {mode === "signup" && renderSignupForm()}
                    {mode === "forgot" && renderForgotForm()}
                    {mode === "reset" && renderResetForm()}
                  </motion.div>

                  {mode === "login" || mode === "signup" ? (
                    <>
                      <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#e3ebf5]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9ab0]">
                          or continue with
                        </span>
                        <div className="h-px flex-1 bg-[#e3ebf5]" />
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleContinue}
                        className="flex w-full items-center justify-center gap-3 rounded-[18px] border border-[#d7e3f4] bg-[#f8fbff] px-4 py-3.5 text-sm font-semibold text-[#22314a] shadow-[0_12px_28px_rgba(15,97,229,0.05)] transition-all duration-300 hover:border-[#1565C0] hover:bg-white hover:text-[#1565C0]"
                      >
                        <FcGoogle className="text-xl" />
                        {mode === "signup"
                          ? `Start ${selectedRole.label} signup with Google`
                          : `Continue as ${selectedRole.label} with Google`}
                      </button>

                      <p className="mt-3 text-center text-xs leading-5 text-[#7a8ca5]">
                        Google can speed things up, but your school-specific profile details still stay inside the portal.
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      {isPage ? null : (
      <div
        className={`relative overflow-hidden bg-[linear-gradient(155deg,#0b3f91_0%,#0f61e5_58%,#72b7ff_100%)] text-white ${
          "px-5 py-5 sm:px-6"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%)]" />
        <div className="absolute left-[-3rem] top-5 h-24 w-24 rounded-full bg-white/10 blur-sm" />
        <div className="absolute right-[-1rem] bottom-[-1rem] h-28 w-28 rounded-full bg-white/10 blur-sm" />
        <div className="absolute inset-y-0 right-6 w-28 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:18px_18px] opacity-35" />
        <div className="absolute bottom-[-0.6rem] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 rounded-[4px] bg-white" />

        <div className="relative z-10 flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white/18 shadow-[0_10px_24px_rgba(4,28,77,0.22)]">
            <SelectedIcon className="text-xl text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/72">
              MNRS Portal
            </p>
            <h2 className={`mt-1 font-serif font-bold leading-snug text-[1.9rem]`}>
              {variant === "floating"
                ? "Smooth access from the bottom corner."
                : "Portal access that stays compact, clear, and calm."}
            </h2>
            <p className={`max-w-md text-blue-50/92 ${isPage ? "mt-1 text-xs leading-4" : "mt-3 text-sm leading-6"}`}>
              {isPage
                ? `${selectedRole.eyebrow} for ${selectedRole.label.toLowerCase()} accounts in a shorter, better-balanced layout.`
                : `${selectedRole.eyebrow} for ${selectedRole.label.toLowerCase()} accounts with a short, friendly path to continue.`}
            </p>
          </div>
        </div>
      </div>
      )}

      <div className={bodyClassName}>
        <div className={`rounded-2xl ${isPage ? "border-2 border-blue-400 bg-white/15 backdrop-blur-md p-1.5 shadow-md" : "border border-[#dfe8f5] bg-[#f8fbff] p-1.5 shadow-[0_12px_30px_rgba(15,97,229,0.08)]"}`}>
          <div className="grid grid-cols-3 gap-2">
            {ROLE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const active = option.id === role;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setRole(option.id);
                    resetFeedback();
                  }}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl px-2 py-2.5 text-[13px] font-semibold transition-all duration-300 sm:px-3 ${
                    isPage
                      ? active
                        ? "text-blue-900 shadow-md"
                        : "text-white/70 hover:bg-white/20 hover:text-white"
                      : active
                      ? "text-white shadow-md"
                      : "text-[#4b5c78] hover:bg-[#edf4ff] hover:text-[#0f61e5]"
                  }`}
                  style={{ backgroundColor: active ? (isPage ? "#00bdff" : selectedRole.accent) : "transparent" }}
                >
                  <Icon className="text-sm" />
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.label.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`flex items-center justify-between gap-3 ${isPage ? "mt-3" : "mt-4"}`}>
          <div className={`inline-flex rounded-full border-2 p-1 text-sm ${isPage ? "border-blue-400 bg-white/15 backdrop-blur-md shadow-md" : "border-[#d9e7fb] bg-white shadow-[0_8px_24px_rgba(15,97,229,0.06)]"}`}>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-full font-semibold transition-colors ${isPage ? "px-4 py-1.5" : "px-4 py-2"} ${
                mode === "login" 
                  ? isPage ? "bg-blue-500 text-white" : "bg-[#0f61e5] text-white"
                  : isPage ? "text-white/70 hover:text-white" : "text-[#5e708d]"
              }`}
            >
              Login
            </button>
          </div>

          {mode !== "forgot" && mode !== "reset" ? (
            <button
              type="button"
              onClick={() => switchMode("forgot")}
              className={`text-sm font-semibold transition-colors ${isPage ? "text-cyan-300 hover:text-white" : "text-[#0f61e5] hover:text-[#084db8]"}`}
            >
              Forgot?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-sm font-semibold text-[#0f61e5] transition-colors hover:text-[#084db8]"
            >
              Back to login
            </button>
          )}
        </div>

        <div className={`relative rounded-[28px] border border-[#e2ebf7] bg-white shadow-[0_18px_40px_rgba(15,97,229,0.08)] ${isPage ? "mt-4 p-4 lg:p-4" : "mt-5 p-4 sm:p-5"}`}>
          <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-[#edf4ff] opacity-80 blur-2xl" />
          <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,97,229,0.18),transparent)]" />

          <div className="relative z-10">
            <div className="flex items-start gap-3">
              <div
                className={`flex shrink-0 items-center justify-center rounded-[18px] ${isPage ? "h-11 w-11" : "h-12 w-12"}`}
                style={{ backgroundColor: selectedRole.softAccent, color: selectedRole.accent }}
              >
                <SelectedIcon className={isPage ? "text-base" : "text-lg"} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7a8ca5]">
                  {selectedRole.eyebrow}
                </p>
                <h3 className={`mt-1 font-serif font-bold leading-tight text-[#0d1b2a] ${isPage ? "text-[1.55rem]" : "text-[1.8rem]"}`}>
                  {MODE_LABELS[mode]}
                </h3>
                <p className={`text-[#5c6d86] ${isPage ? "mt-1.5 text-[13px] leading-5" : "mt-2 text-sm leading-6"}`}>
                  {selectedRole.description}
                </p>
              </div>
            </div>

            {isPage ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {ROLE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const active = option.id === role;

                  return (
                    <span
                      key={`${option.id}-chip`}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        active
                          ? "border-[#b9d1fb] bg-[#edf4ff] text-[#0f61e5]"
                          : "border-[#e0e8f5] bg-[#f9fbff] text-[#61748f]"
                      }`}
                    >
                      <Icon className="text-[11px]" />
                      {option.label}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>

          <AnimatePresence initial={false}>
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  isPage
                    ? "border-red-400/50 bg-red-500/20 text-red-100"
                    : "border-red-200 bg-red-50 text-red-600"
                } ${isPage ? "mt-3" : "mt-4"}`}
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
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  isPage
                    ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-100"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                } ${isPage ? "mt-3" : "mt-4"}`}
              >
                {success}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {providerHint ? (
            <div className={`rounded-2xl border px-4 py-3 text-sm ${
              isPage
                ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-100"
                : "border-blue-200 bg-blue-50 text-blue-700"
            } ${isPage ? "mt-3" : "mt-4"}`}>
              {providerHint}
            </div>
          ) : null}

          <motion.div
            key={`${mode}-${role}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className={isPage ? "mt-3.5" : "mt-5"}
          >
            {mode === "login" && renderLoginForm()}
            {mode === "signup" && renderSignupForm()}
            {mode === "forgot" && renderForgotForm()}
            {mode === "reset" && renderResetForm()}
          </motion.div>

          {(mode === "login" || mode === "signup") ? (
            <>
              <div className={`flex items-center gap-3 ${isPage ? "my-3.5" : "my-5"}`}>
                <div className={`h-px flex-1 ${isPage ? "bg-blue-400/50" : "bg-[#e3ebf8]"}`} />
                <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${isPage ? "text-white/80" : "text-[#8aa0bc]"}`}>
                  or continue with
                </span>
                <div className={`h-px flex-1 ${isPage ? "bg-blue-400/50" : "bg-[#e3ebf8]"}`} />
              </div>

              <button
                type="button"
                onClick={handleGoogleContinue}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  isPage
                    ? "border-blue-400 bg-white/15 backdrop-blur-md text-black hover:bg-white/25 hover:border-blue-300"
                    : "border-[#d7e3f4] bg-white text-[#22314a] shadow-[0_10px_24px_rgba(15,97,229,0.05)] hover:border-[#0f61e5] hover:text-[#0f61e5]"
                }`}
              >
                <FcGoogle className="text-xl" />
                {mode === "signup"
                  ? `Start ${selectedRole.label} signup with Google`
                  : `Continue as ${selectedRole.label} with Google`}
              </button>

              {!isPage ? (
                <p className="mt-3 text-center text-xs leading-5 text-[#7a8ca5]">
                  Google can speed things up, but role-specific school details still stay in your portal profile.
                </p>
              ) : null}
            </>
          ) : null}

          {!isPage ? (
            <div className="mt-5 border-t border-[#e3ebf8] pt-4 text-[13px] leading-6 text-[#677a95]">
              Protected access for {selectedRole.label.toLowerCase()} accounts. Need personal help?{" "}
              <Link href="/contact" className="font-semibold text-[#0f61e5] transition-colors hover:text-[#084db8]">
                Contact support
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
