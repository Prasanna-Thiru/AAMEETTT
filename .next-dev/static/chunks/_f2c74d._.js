(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f2c74d._.js", {

"[project]/frontend/components/auth/auth-config.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AUTH_REDIRECTS": ()=>AUTH_REDIRECTS,
    "ROLE_OPTIONS": ()=>ROLE_OPTIONS
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa6/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.esm.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const AUTH_REDIRECTS = {
    student: "/student/dashboard",
    parent: "/parent/dashboard",
    faculty: "/faculty/dashboard"
};
const ROLE_OPTIONS = [
    {
        id: "student",
        label: "Student",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaGraduationCap"],
        eyebrow: "Academic Dashboard",
        description: "Check attendance, assignments, marks, and circulars in one secure space.",
        accent: "#0f61e5",
        softAccent: "#dbeafe"
    },
    {
        id: "parent",
        label: "Parent",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUsers"],
        eyebrow: "Family Access",
        description: "Track your child's progress, notices, fee updates, and school communication.",
        accent: "#0284c7",
        softAccent: "#dff4ff"
    },
    {
        id: "faculty",
        label: "Faculty",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaChalkboardUser"],
        eyebrow: "Teaching Console",
        description: "Manage classes, records, announcements, and day-to-day academic workflow.",
        accent: "#1d4ed8",
        softAccent: "#dde7ff"
    }
];

})()),
"[project]/frontend/components/auth/AuthPanel.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>AuthPanel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/dom/motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa6/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fc/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/components/auth/auth-config.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
;
const DEFAULT_SIGNUP_FORM = {
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
    imageUrl: ""
};
const MODE_LABELS = {
    login: "Login",
    signup: "Sign Up",
    forgot: "Forgot Password",
    reset: "Reset Password"
};
const QUERY_MESSAGES = {
    "google-config": "Google login is not configured yet. Add Google client keys to enable it.",
    "google-invalid-request": "The Google sign-in request was incomplete. Please try again.",
    "google-callback": "Google sign-in could not be completed. Please try again.",
    "google-token": "Google sign-in could not retrieve your access token. Please try again.",
    "google-profile": "We could not read your Google profile. Please try again.",
    "google-unavailable": "Google sign-in is temporarily unavailable. Please try again shortly.",
    "google-no-account": "We found your Google account, but not a matching portal account. Finish signup below.",
    "google-prefill": "Your Google details are ready. Complete the remaining fields to create your account.",
    "student-not-approved": "This student email is not approved for portal access yet. Please contact the school office."
};
function isUserRole(value) {
    return value === "student" || value === "parent" || value === "faculty";
}
function isAuthMode(value) {
    return value === "login" || value === "signup" || value === "forgot" || value === "reset";
}
function AuthPanel({ variant = "page", onSuccess }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const isPage = variant === "page";
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("student");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [loginEmail, setLoginEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loginPassword, setLoginPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [forgotEmail, setForgotEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [resetToken, setResetToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [resetPassword, setResetPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [resetConfirmPassword, setResetConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [signupForm, setSignupForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_SIGNUP_FORM);
    const [showLoginPassword, setShowLoginPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSignupPassword, setShowSignupPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSignupConfirmPassword, setShowSignupConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showResetPassword, setShowResetPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showResetConfirmPassword, setShowResetConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [providerHint, setProviderHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const selectedRole = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].find((option)=>option.id === role) ?? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"][0];
    const SelectedIcon = selectedRole.icon;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
            setSignupForm((prev)=>({
                    ...prev,
                    email: queryEmail
                }));
        }
        if (queryName) {
            setSignupForm((prev)=>({
                    ...prev,
                    name: queryName
                }));
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
    }, [
        searchParams
    ]);
    const shellClassName = variant === "floating" ? "w-full max-w-[24rem] overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-[0_28px_60px_rgba(15,97,229,0.25)]" : "relative w-full overflow-hidden rounded-2xl border-0 bg-transparent lg:flex lg:flex-col lg:h-full";
    const bodyClassName = variant === "floating" ? "max-h-[78vh] overflow-y-auto px-4 py-4 sm:px-5" : "relative px-0 py-0 sm:px-0 lg:flex-1 lg:overflow-y-auto lg:px-0 lg:py-0";
    const resetFeedback = ()=>{
        setError("");
        setSuccess("");
    };
    const switchMode = (nextMode)=>{
        resetFeedback();
        setProviderHint("");
        setMode(nextMode);
    };
    const updateSignupField = (field, value)=>{
        setSignupForm((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleAuthSuccess = (redirectTo)=>{
        onSuccess?.();
        router.push(redirectTo || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_REDIRECTS"][role]);
    };
    const handleLogin = async (e)=>{
        e.preventDefault();
        resetFeedback();
        setSubmitting(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/auth/${role}/login`, {
                email: loginEmail,
                password: loginPassword
            });
            handleAuthSuccess(response.data.redirectTo || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_REDIRECTS"][role]);
        } catch (err) {
            setError(err.response?.data?.error || "Unable to sign you in right now.");
        } finally{
            setSubmitting(false);
        }
    };
    const handleSignup = async (e)=>{
        e.preventDefault();
        resetFeedback();
        if (signupForm.password !== signupForm.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                role,
                name: signupForm.name,
                email: signupForm.email,
                password: signupForm.password
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/signup", payload);
            handleAuthSuccess(response.data.redirectTo || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_REDIRECTS"][role]);
        } catch (err) {
            setError(err.response?.data?.error || "Unable to create your account right now.");
        } finally{
            setSubmitting(false);
        }
    };
    const handleForgot = async (e)=>{
        e.preventDefault();
        resetFeedback();
        setSubmitting(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/request-reset", {
                role,
                email: forgotEmail
            });
            setSuccess(response.data.message || "If the account exists, a reset link has been sent.");
        } catch (err) {
            setError(err.response?.data?.error || "Unable to send a reset link right now.");
        } finally{
            setSubmitting(false);
        }
    };
    const handleReset = async (e)=>{
        e.preventDefault();
        resetFeedback();
        if (resetPassword !== resetConfirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setSubmitting(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/reset-password", {
                role,
                token: resetToken,
                password: resetPassword
            });
            setSuccess(response.data.message || "Your password has been updated.");
            setMode("login");
            setLoginPassword("");
            setResetPassword("");
            setResetConfirmPassword("");
        } catch (err) {
            setError(err.response?.data?.error || "Unable to reset your password right now.");
        } finally{
            setSubmitting(false);
        }
    };
    const handleGoogleContinue = ()=>{
        resetFeedback();
        const intent = mode === "signup" ? "signup" : "login";
        window.location.href = `/api/auth/google?role=${role}&intent=${intent}`;
    };
    const fieldShell = isPage ? "flex items-center gap-3 rounded-[18px] border border-[#d9e3f0] bg-[#f6f9fc] px-4 py-3 shadow-[0_10px_28px_rgba(15,97,229,0.04)] transition-all duration-200 focus-within:border-[#42A5F5] focus-within:bg-white focus-within:shadow-[0_16px_34px_rgba(21,101,192,0.14)]" : "flex items-center gap-3 rounded-2xl border-2 border-blue-400 bg-white/15 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all focus-within:border-cyan-300 focus-within:bg-white/25";
    const textInputClass = isPage ? "w-full bg-transparent text-sm font-medium text-[#0a2540] outline-none placeholder:text-[#9aa9bf]" : "w-full bg-transparent text-sm font-medium text-black outline-none placeholder:text-gray-400";
    const plainInputClass = isPage ? "w-full rounded-[18px] border border-[#d9e3f0] bg-[#f6f9fc] px-4 py-3 text-sm font-medium text-[#0a2540] shadow-[0_10px_28px_rgba(15,97,229,0.04)] outline-none transition-all duration-200 placeholder:text-[#9aa9bf] focus:border-[#42A5F5] focus:bg-white focus:shadow-[0_16px_34px_rgba(21,101,192,0.14)]" : "w-full rounded-2xl border-2 border-blue-400 bg-white/15 px-4 py-3 text-sm font-medium text-black shadow-[0_8px_24px_rgba(0,0,0,0.1)] outline-none transition-all placeholder:text-gray-400 focus:border-cyan-300 focus:bg-white/25 backdrop-blur-md";
    const submitClass = isPage ? "flex w-full items-center justify-center gap-3 rounded-[18px] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(21,101,192,0.24)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_rgba(21,101,192,0.28)]" : "flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold text-blue-900 shadow-[0_14px_30px_rgba(0,189,255,0.35)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,189,255,0.4)]";
    const labelClass = isPage ? "mb-2 block text-[13px] font-semibold text-[#4f6480]" : "mb-2 block text-sm font-semibold text-white/95 drop-shadow-sm";
    const renderLoginForm = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleLogin,
            className: isPage ? "space-y-3.5" : "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: labelClass,
                            children: "Email Address"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 324,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: fieldShell,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEnvelope"], {
                                    className: "shrink-0 text-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 326,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: loginEmail,
                                    onChange: (e)=>setLoginEmail(e.target.value),
                                    required: true,
                                    placeholder: "Enter your registered email",
                                    className: textInputClass
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 327,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 325,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 323,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: labelClass,
                            children: "Password"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 339,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: fieldShell,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLock"], {
                                    className: "shrink-0 text-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 341,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: showLoginPassword ? "text" : "password",
                                    value: loginPassword,
                                    onChange: (e)=>setLoginPassword(e.target.value),
                                    required: true,
                                    placeholder: "Enter your password",
                                    className: textInputClass
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 342,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowLoginPassword((prev)=>!prev),
                                    className: "shrink-0 text-blue-600 transition-colors hover:text-blue-800",
                                    "aria-label": showLoginPassword ? "Hide password" : "Show password",
                                    children: showLoginPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 356,
                                        columnNumber: 34
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 356,
                                        columnNumber: 51
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 350,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 340,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 338,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: submitting,
                    className: submitClass,
                    style: {
                        backgroundColor: selectedRole.accent
                    },
                    children: [
                        submitting ? "Signing in..." : `Continue as ${selectedRole.label}`,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRightLong"], {
                            className: "text-sm"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 368,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 361,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
            lineNumber: 322,
            columnNumber: 5
        }, this);
    const renderForgotForm = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleForgot,
            className: isPage ? "space-y-3.5" : "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: labelClass,
                            children: "Registered Email"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 376,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: fieldShell,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEnvelope"], {
                                    className: "shrink-0 text-[#0f61e5]"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 378,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: forgotEmail,
                                    onChange: (e)=>setForgotEmail(e.target.value),
                                    required: true,
                                    placeholder: "Enter your registered email",
                                    className: textInputClass
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 379,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 377,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 375,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: submitting,
                    className: submitClass,
                    style: {
                        backgroundColor: selectedRole.accent
                    },
                    children: [
                        submitting ? "Sending link..." : "Send Reset Link",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRightLong"], {
                            className: "text-sm"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 397,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 390,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
            lineNumber: 374,
            columnNumber: 5
        }, this);
    const renderResetForm = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleReset,
            className: isPage ? "space-y-3.5" : "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: labelClass,
                            children: "New Password"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 405,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: fieldShell,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLock"], {
                                    className: "shrink-0 text-[#0f61e5]"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 407,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: showResetPassword ? "text" : "password",
                                    value: resetPassword,
                                    onChange: (e)=>setResetPassword(e.target.value),
                                    required: true,
                                    minLength: 8,
                                    placeholder: "Enter a new password",
                                    className: textInputClass
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 408,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowResetPassword((prev)=>!prev),
                                    className: "shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]",
                                    "aria-label": showResetPassword ? "Hide password" : "Show password",
                                    children: showResetPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 423,
                                        columnNumber: 34
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 423,
                                        columnNumber: 51
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 417,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 406,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 404,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: labelClass,
                            children: "Confirm New Password"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 429,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: fieldShell,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLock"], {
                                    className: "shrink-0 text-[#0f61e5]"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 431,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: showResetConfirmPassword ? "text" : "password",
                                    value: resetConfirmPassword,
                                    onChange: (e)=>setResetConfirmPassword(e.target.value),
                                    required: true,
                                    minLength: 8,
                                    placeholder: "Repeat your new password",
                                    className: textInputClass
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 432,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowResetConfirmPassword((prev)=>!prev),
                                    className: "shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]",
                                    "aria-label": showResetConfirmPassword ? "Hide password" : "Show password",
                                    children: showResetConfirmPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 447,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 447,
                                        columnNumber: 58
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 441,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 430,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 428,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: submitting,
                    className: submitClass,
                    style: {
                        backgroundColor: selectedRole.accent
                    },
                    children: [
                        submitting ? "Updating password..." : "Update Password",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRightLong"], {
                            className: "text-sm"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 459,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 452,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
            lineNumber: 403,
            columnNumber: 5
        }, this);
    const renderSignupForm = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSignup,
            className: isPage ? "space-y-3.5" : "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid sm:grid-cols-2 ${isPage ? "gap-3" : "gap-4"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block sm:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: labelClass,
                                    children: "Full Name"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 468,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: fieldShell,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUser"], {
                                            className: "shrink-0 text-[#0f61e5]"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 470,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.name,
                                            onChange: (e)=>updateSignupField("name", e.target.value),
                                            required: true,
                                            placeholder: "Enter your full name",
                                            className: textInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 471,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 469,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 467,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block sm:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: labelClass,
                                    children: "Email Address"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 483,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: fieldShell,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEnvelope"], {
                                            className: "shrink-0 text-[#0f61e5]"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 485,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: signupForm.email,
                                            onChange: (e)=>updateSignupField("email", e.target.value),
                                            required: true,
                                            placeholder: "Enter your email",
                                            className: textInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 486,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 484,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 482,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: labelClass,
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 498,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: fieldShell,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLock"], {
                                            className: "shrink-0 text-[#0f61e5]"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 500,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showSignupPassword ? "text" : "password",
                                            value: signupForm.password,
                                            onChange: (e)=>updateSignupField("password", e.target.value),
                                            required: true,
                                            minLength: 8,
                                            placeholder: "Minimum 8 characters",
                                            className: textInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 501,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowSignupPassword((prev)=>!prev),
                                            className: "shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]",
                                            "aria-label": showSignupPassword ? "Hide password" : "Show password",
                                            children: showSignupPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 516,
                                                columnNumber: 37
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 516,
                                                columnNumber: 54
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 510,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 499,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 497,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: labelClass,
                                    children: "Confirm Password"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 522,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: fieldShell,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLock"], {
                                            className: "shrink-0 text-[#0f61e5]"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 524,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showSignupConfirmPassword ? "text" : "password",
                                            value: signupForm.confirmPassword,
                                            onChange: (e)=>updateSignupField("confirmPassword", e.target.value),
                                            required: true,
                                            minLength: 8,
                                            placeholder: "Repeat your password",
                                            className: textInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 525,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowSignupConfirmPassword((prev)=>!prev),
                                            className: "shrink-0 text-[#6d84a4] transition-colors hover:text-[#0f61e5]",
                                            "aria-label": showSignupConfirmPassword ? "Hide password" : "Show password",
                                            children: showSignupConfirmPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 540,
                                                columnNumber: 44
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 540,
                                                columnNumber: 61
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 534,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 523,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 521,
                            columnNumber: 9
                        }, this),
                        role === "student" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Roll Number"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 548,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.rollNumber,
                                            onChange: (e)=>updateSignupField("rollNumber", e.target.value),
                                            required: true,
                                            placeholder: "e.g. 2026-014",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 547,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Class"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 560,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.className,
                                            onChange: (e)=>updateSignupField("className", e.target.value),
                                            required: true,
                                            placeholder: "e.g. Grade 7",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 561,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 559,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Parent Email"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 572,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: signupForm.parentEmail,
                                            onChange: (e)=>updateSignupField("parentEmail", e.target.value),
                                            placeholder: "Optional parent email",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 573,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 571,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Phone"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: fieldShell,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPhone"], {
                                                    className: "shrink-0 text-[#0f61e5]"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    value: signupForm.phone,
                                                    onChange: (e)=>updateSignupField("phone", e.target.value),
                                                    placeholder: "Optional contact number",
                                                    className: textInputClass
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 584,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 582,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true) : null,
                        role === "parent" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Phone Number"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 601,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: fieldShell,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPhone"], {
                                                    className: "shrink-0 text-[#0f61e5]"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    value: signupForm.phone,
                                                    onChange: (e)=>updateSignupField("phone", e.target.value),
                                                    required: true,
                                                    placeholder: "Enter your phone number",
                                                    className: textInputClass
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 602,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 600,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Children Names"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 616,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.childrenNames,
                                            onChange: (e)=>updateSignupField("childrenNames", e.target.value),
                                            placeholder: "Separate names with commas",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 615,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true) : null,
                        role === "faculty" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Designation"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 631,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.designation,
                                            onChange: (e)=>updateSignupField("designation", e.target.value),
                                            required: true,
                                            placeholder: "e.g. Senior Teacher",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 630,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Subject"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 643,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.subject,
                                            onChange: (e)=>updateSignupField("subject", e.target.value),
                                            required: true,
                                            placeholder: "e.g. Mathematics",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 644,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 642,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Qualification"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 655,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.qualification,
                                            onChange: (e)=>updateSignupField("qualification", e.target.value),
                                            required: true,
                                            placeholder: "e.g. M.Sc, B.Ed",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 656,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 654,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Experience"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 667,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: signupForm.experience,
                                            onChange: (e)=>updateSignupField("experience", e.target.value),
                                            required: true,
                                            placeholder: "e.g. 10 years",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 668,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 666,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: labelClass,
                                            children: "Bio"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 679,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: signupForm.bio,
                                            onChange: (e)=>updateSignupField("bio", e.target.value),
                                            rows: 3,
                                            placeholder: "Short faculty introduction",
                                            className: plainInputClass
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 680,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 466,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: submitting,
                    className: submitClass,
                    style: {
                        backgroundColor: selectedRole.accent
                    },
                    children: [
                        submitting ? "Creating account..." : `Create ${selectedRole.label} Account`,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRightLong"], {
                            className: "text-sm"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 699,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 692,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
            lineNumber: 465,
            columnNumber: 5
        }, this);
    const pagePanelCopy = {
        login: {
            title: "Welcome back to your portal",
            description: `Sign in and continue with your ${selectedRole.label.toLowerCase()} dashboard in one calm, focused view.`
        },
        signup: {
            title: "Let's get you set up",
            description: `It should only take a couple of minutes to activate your ${selectedRole.label.toLowerCase()} access with MNRS.`
        },
        forgot: {
            title: "Recover your access safely",
            description: "We will send a secure reset link to the email address connected to your school account."
        },
        reset: {
            title: "Create a fresh password",
            description: "Use a strong password so you can get back into the portal without friction."
        }
    };
    const pageFormCopy = {
        login: `Use your registered ${selectedRole.label.toLowerCase()} account details to continue.`,
        signup: `Fill in the required details below to create your ${selectedRole.label.toLowerCase()} profile.`,
        forgot: "Tell us the registered email and we will send the next step there.",
        reset: "Set your new password below and then return straight to login."
    };
    if (isPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto min-h-[42rem] overflow-hidden rounded-[1.85rem] bg-white shadow-[0_28px_80px_rgba(33,71,135,0.22)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-[16.25rem] overflow-hidden bg-[linear-gradient(145deg,#5f7fd0_0%,#7f9de9_54%,#d8e8ff_100%)] px-5 pt-5 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_30%_30%,#385ed0_0%,#172e69_72%)] shadow-[0_18px_40px_rgba(16,38,89,0.35)]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 736,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -right-4 -top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_25%_20%,#ffffff_0%,#e9f2ff_42%,rgba(255,255,255,0)_70%)]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 737,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-12 top-14 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_32%_28%,#9bc4ff_0%,#5d8ee8_56%,#4568d7_100%)] opacity-95"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-20 top-[7.5rem] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#9dc4ff_42%,#5a86de_100%)] shadow-[0_14px_30px_rgba(40,80,160,0.28)]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 739,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-14 -left-12 h-64 w-64 rounded-[44%] bg-[linear-gradient(145deg,rgba(21,63,160,0.82),rgba(9,24,62,0.96))]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-[-3rem] left-16 h-72 w-56 rotate-[-22deg] rounded-[48%] bg-white/22"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-4 left-5 h-14 w-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#9dc4ff_52%,#3468ce_100%)] shadow-[0_14px_28px_rgba(13,36,86,0.22)]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 742,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-[-1.8rem] left-[8.5rem] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_38%_28%,#2f64d9_0%,#12285d_82%)] shadow-[0_22px_44px_rgba(10,26,65,0.35)]"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 743,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "aria-hidden": "true",
                                                        children: "‹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Back"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 746,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-white/18 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md",
                                                children: "MNRS"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 750,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 745,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 mt-16 max-w-[15rem]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-[2rem] font-bold leading-tight tracking-normal text-white",
                                                children: mode === "signup" ? "Get Started" : "Welcome back"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 756,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm font-medium leading-5 text-white/88",
                                                children: mode === "signup" ? `Create your ${selectedRole.label.toLowerCase()} portal access.` : `Sign in to your ${selectedRole.label.toLowerCase()} portal.`
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 759,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 755,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 735,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-20 -mt-8 rounded-t-[2rem] bg-white px-5 pb-7 pt-7",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto max-w-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2 rounded-2xl bg-[#eef4ff] p-1.5",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].map((option)=>{
                                                const Icon = option.icon;
                                                const active = option.id === role;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setRole(option.id);
                                                        resetFeedback();
                                                    },
                                                    className: `flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all ${active ? "bg-white text-[#3268d6] shadow-sm" : "text-[#6a7c9f]"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: "text-[13px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 786,
                                                            columnNumber: 23
                                                        }, this),
                                                        option.label.slice(0, 3)
                                                    ]
                                                }, `${option.id}-mobile-role`, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 769,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex rounded-full bg-[#f1f5fb] p-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>switchMode("login"),
                                                            className: `rounded-full px-4 py-2 text-xs font-bold transition-colors ${mode === "login" ? "bg-[#3f6fd2] text-white" : "text-[#64748b]"}`,
                                                            children: "Sign in"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>switchMode("signup"),
                                                            className: `rounded-full px-4 py-2 text-xs font-bold transition-colors ${mode === "signup" ? "bg-[#3f6fd2] text-white" : "text-[#64748b]"}`,
                                                            children: "Sign up"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 794,
                                                    columnNumber: 17
                                                }, this),
                                                mode !== "forgot" && mode !== "reset" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>switchMode("forgot"),
                                                    className: "text-xs font-bold text-[#3268d6]",
                                                    children: "Forgot?"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>switchMode("login"),
                                                    className: "text-xs font-bold text-[#3268d6]",
                                                    children: "Back"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 793,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[1.75rem] font-bold leading-tight tracking-normal text-[#3268d6]",
                                                    children: mode === "signup" ? "Get Started" : mode === "login" ? "Welcome back" : MODE_LABELS[mode]
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mx-auto mt-2 max-w-[17rem] text-xs leading-5 text-[#6d7c93]",
                                                    children: mode === "signup" ? `Use an approved email to create your ${selectedRole.label.toLowerCase()} profile.` : pageFormCopy[mode]
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 838,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 834,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            initial: false,
                                            children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: -8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -8
                                                },
                                                className: "mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                                                children: error
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 847,
                                                columnNumber: 19
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 845,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            initial: false,
                                            children: success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: -8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -8
                                                },
                                                className: "mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700",
                                                children: success
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 860,
                                                columnNumber: 19
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 858,
                                            columnNumber: 15
                                        }, this),
                                        providerHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700",
                                            children: providerHint
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 872,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                duration: 0.22
                                            },
                                            className: "mt-5",
                                            children: [
                                                mode === "login" && renderLoginForm(),
                                                mode === "signup" && renderSignupForm(),
                                                mode === "forgot" && renderForgotForm(),
                                                mode === "reset" && renderResetForm()
                                            ]
                                        }, `mobile-${mode}-${role}`, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 877,
                                            columnNumber: 15
                                        }, this),
                                        mode === "login" || mode === "signup" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "my-5 flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-px flex-1 bg-[#e7edf7]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 893,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-semibold text-[#9aa8bd]",
                                                            children: "Sign in with"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 894,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-px flex-1 bg-[#e7edf7]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 895,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleGoogleContinue,
                                                    className: "flex w-full items-center justify-center gap-3 rounded-[18px] border border-[#dbe5f4] bg-white px-4 py-3.5 text-sm font-bold text-[#22314a] shadow-[0_10px_28px_rgba(38,86,168,0.08)] transition-colors hover:border-[#3268d6] hover:text-[#3268d6]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FcGoogle"], {
                                                            className: "text-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 903,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Continue with Google"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-4 text-center text-xs leading-5 text-[#7b8798]",
                                                    children: [
                                                        mode === "signup" ? "Already have an account? " : "Don't have an account? ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>switchMode(mode === "signup" ? "login" : "signup"),
                                                            className: "font-bold text-[#3268d6]",
                                                            children: mode === "signup" ? "Sign in" : "Sign up"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 909,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 907,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 768,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 767,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 734,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 733,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden bg-white lg:grid lg:min-h-[640px] lg:grid-cols-[0.9fr_1.22fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden bg-[linear-gradient(180deg,#38BDF8_0%,#1976D2_42%,#0D47A1_100%)] px-6 py-7 text-white sm:px-8 sm:py-8 lg:flex lg:flex-col lg:justify-between lg:px-10 lg:py-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_34%)]"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 926,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-[-2.5rem] top-10 h-36 w-36 rounded-full bg-white/14 blur-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 927,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-[-3rem] left-[-2rem] h-44 w-44 rounded-full bg-[#0A2540]/20 blur-3xl"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 928,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-y-10 right-7 w-px bg-white/18"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 929,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-semibold uppercase tracking-[0.34em] text-white/78",
                                            children: "MNRS Portal"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 932,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-medium text-white/88 backdrop-blur-md",
                                            children: "Secure access for students, parents, and faculty"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 935,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 931,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 mt-8 flex flex-col items-center text-center lg:mt-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex h-40 w-40 items-center justify-center rounded-full bg-white/18 shadow-[0_24px_60px_rgba(7,24,41,0.2)] sm:h-44 sm:w-44",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-4 rounded-full border border-white/18"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-10 rounded-full bg-white/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 943,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#ddecff_100%)] text-[#0A2540] shadow-[0_16px_30px_rgba(7,24,41,0.18)] sm:h-32 sm:w-32",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectedIcon, {
                                                        className: "text-[3rem]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 945,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 944,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 941,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 max-w-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-serif text-[2rem] font-bold leading-tight sm:text-[2.3rem]",
                                                    children: pagePanelCopy[mode].title
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-sm leading-6 text-white/88 sm:text-[15px]",
                                                    children: pagePanelCopy[mode].description
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 953,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 949,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 flex flex-wrap items-center justify-center gap-2",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].map((option)=>{
                                                const Icon = option.icon;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${option.id === role ? "border-white/45 bg-white/24 text-white" : "border-white/18 bg-white/10 text-white/74"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: "text-[11px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 971,
                                                            columnNumber: 21
                                                        }, this),
                                                        option.label
                                                    ]
                                                }, `${option.id}-page-side`, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 963,
                                                    columnNumber: 19
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 958,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 940,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 925,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-full flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b border-[#edf2f8] px-5 py-5 sm:px-7 lg:px-10 lg:py-7",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a9ab0]",
                                                            children: "Portal Form"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 987,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "mt-2 font-serif text-[1.9rem] font-bold leading-tight text-[#071829]",
                                                            children: MODE_LABELS[mode]
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 990,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 max-w-xl text-sm leading-6 text-[#61748f]",
                                                            children: pageFormCopy[mode]
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 993,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/contact",
                                                    className: "text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]",
                                                    children: "Need help?"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 998,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 985,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 984,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 py-5 sm:px-7 lg:px-10 lg:py-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-auto max-w-[40rem]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-[26px] border border-[#edf2f8] bg-[#fbfdff] p-2 shadow-[0_18px_40px_rgba(10,37,64,0.06)]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-2",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].map((option)=>{
                                                            const Icon = option.icon;
                                                            const active = option.id === role;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setRole(option.id);
                                                                    resetFeedback();
                                                                },
                                                                className: `flex items-center justify-center gap-2 rounded-[20px] px-3 py-3 text-sm font-semibold transition-all duration-300 ${active ? "text-white shadow-[0_14px_28px_rgba(21,101,192,0.22)]" : "text-[#58708d] hover:bg-white hover:text-[#0D47A1]"}`,
                                                                style: {
                                                                    backgroundColor: active ? option.accent : "transparent"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                        className: "text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                        lineNumber: 1030,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hidden sm:inline",
                                                                        children: option.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                        lineNumber: 1031,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "sm:hidden",
                                                                        children: option.label.slice(0, 3)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                        lineNumber: 1032,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, option.id, true, {
                                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                lineNumber: 1016,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 1010,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 1009,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex rounded-full border border-[#d8e3ef] bg-[#f7fafd] p-1 shadow-[0_10px_24px_rgba(10,37,64,0.05)]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>switchMode("login"),
                                                                className: `rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === "login" ? "bg-[#1565C0] text-white" : "text-[#61748f] hover:text-[#0D47A1]"}`,
                                                                children: "Login"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                lineNumber: 1041,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 19
                                                        }, this),
                                                        mode !== "forgot" && mode !== "reset" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>switchMode("forgot"),
                                                            className: "text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]",
                                                            children: "Forgot password?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1055,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>switchMode("login"),
                                                            className: "text-sm font-semibold text-[#1976D2] transition-colors hover:text-[#0D47A1]",
                                                            children: "Back to login"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1063,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 rounded-[30px] border border-[#edf2f8] bg-white p-5 shadow-[0_22px_48px_rgba(10,37,64,0.08)] sm:p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px]",
                                                                    style: {
                                                                        backgroundColor: selectedRole.softAccent,
                                                                        color: selectedRole.accent
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectedIcon, {
                                                                        className: "text-lg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                        lineNumber: 1079,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                    lineNumber: 1075,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a9ab0]",
                                                                            children: selectedRole.eyebrow
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1082,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "mt-1 font-serif text-[1.65rem] font-bold leading-tight text-[#071829]",
                                                                            children: MODE_LABELS[mode]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1085,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-2 text-sm leading-6 text-[#61748f]",
                                                                            children: selectedRole.description
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1088,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                    lineNumber: 1081,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1074,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                            initial: false,
                                                            children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    opacity: 0,
                                                                    y: -8
                                                                },
                                                                animate: {
                                                                    opacity: 1,
                                                                    y: 0
                                                                },
                                                                exit: {
                                                                    opacity: 0,
                                                                    y: -8
                                                                },
                                                                className: "mt-5 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                                                                children: error
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                lineNumber: 1096,
                                                                columnNumber: 23
                                                            }, this) : null
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1094,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                            initial: false,
                                                            children: success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    opacity: 0,
                                                                    y: -8
                                                                },
                                                                animate: {
                                                                    opacity: 1,
                                                                    y: 0
                                                                },
                                                                exit: {
                                                                    opacity: 0,
                                                                    y: -8
                                                                },
                                                                className: "mt-5 rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700",
                                                                children: success
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 23
                                                            }, this) : null
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 19
                                                        }, this),
                                                        providerHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-5 rounded-[18px] border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700",
                                                            children: providerHint
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1121,
                                                            columnNumber: 21
                                                        }, this) : null,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0,
                                                                y: 10
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                y: 0
                                                            },
                                                            transition: {
                                                                duration: 0.22
                                                            },
                                                            className: "mt-5",
                                                            children: [
                                                                mode === "login" && renderLoginForm(),
                                                                mode === "signup" && renderSignupForm(),
                                                                mode === "forgot" && renderForgotForm(),
                                                                mode === "reset" && renderResetForm()
                                                            ]
                                                        }, `${mode}-${role}`, true, {
                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                            lineNumber: 1126,
                                                            columnNumber: 19
                                                        }, this),
                                                        mode === "login" || mode === "signup" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "my-5 flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-px flex-1 bg-[#e3ebf5]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1142,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9ab0]",
                                                                            children: "or continue with"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1143,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-px flex-1 bg-[#e3ebf5]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1146,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                    lineNumber: 1141,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: handleGoogleContinue,
                                                                    className: "flex w-full items-center justify-center gap-3 rounded-[18px] border border-[#d7e3f4] bg-[#f8fbff] px-4 py-3.5 text-sm font-semibold text-[#22314a] shadow-[0_12px_28px_rgba(15,97,229,0.05)] transition-all duration-300 hover:border-[#1565C0] hover:bg-white hover:text-[#1565C0]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FcGoogle"], {
                                                                            className: "text-xl"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                            lineNumber: 1154,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        mode === "signup" ? `Start ${selectedRole.label} signup with Google` : `Continue as ${selectedRole.label} with Google`
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                    lineNumber: 1149,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-3 text-center text-xs leading-5 text-[#7a8ca5]",
                                                                    children: "Google can speed things up, but your school-specific profile details still stay inside the portal."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                                    lineNumber: 1160,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 1008,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1007,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 982,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                    lineNumber: 924,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: shellClassName,
        children: [
            isPage ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative overflow-hidden bg-[linear-gradient(155deg,#0b3f91_0%,#0f61e5_58%,#72b7ff_100%)] text-white ${"px-5 py-5 sm:px-6"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%)]"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-[-3rem] top-5 h-24 w-24 rounded-full bg-white/10 blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-[-1rem] bottom-[-1rem] h-28 w-28 rounded-full bg-white/10 blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 right-6 w-28 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:18px_18px] opacity-35"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-[-0.6rem] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 rounded-[4px] bg-white"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white/18 shadow-[0_10px_24px_rgba(4,28,77,0.22)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectedIcon, {
                                    className: "text-xl text-white"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 1191,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-semibold uppercase tracking-widest text-white/72",
                                        children: "MNRS Portal"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `mt-1 font-serif font-bold leading-snug text-[1.9rem]`,
                                        children: variant === "floating" ? "Smooth access from the bottom corner." : "Portal access that stays compact, clear, and calm."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `max-w-md text-blue-50/92 ${isPage ? "mt-1 text-xs leading-4" : "mt-3 text-sm leading-6"}`,
                                        children: isPage ? `${selectedRole.eyebrow} for ${selectedRole.label.toLowerCase()} accounts in a shorter, better-balanced layout.` : `${selectedRole.eyebrow} for ${selectedRole.label.toLowerCase()} accounts with a short, friendly path to continue.`
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1193,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                lineNumber: 1178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: bodyClassName,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-2xl ${isPage ? "border-2 border-blue-400 bg-white/15 backdrop-blur-md p-1.5 shadow-md" : "border border-[#dfe8f5] bg-[#f8fbff] p-1.5 shadow-[0_12px_30px_rgba(15,97,229,0.08)]"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].map((option)=>{
                                const Icon = option.icon;
                                const active = option.id === role;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setRole(option.id);
                                        resetFeedback();
                                    },
                                    className: `flex items-center justify-center gap-1.5 rounded-2xl px-2 py-2.5 text-[13px] font-semibold transition-all duration-300 sm:px-3 ${isPage ? active ? "text-blue-900 shadow-md" : "text-white/70 hover:bg-white/20 hover:text-white" : active ? "text-white shadow-md" : "text-[#4b5c78] hover:bg-[#edf4ff] hover:text-[#0f61e5]"}`,
                                    style: {
                                        backgroundColor: active ? isPage ? "#00bdff" : selectedRole.accent : "transparent"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 1238,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: option.label
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 1239,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sm:hidden",
                                            children: option.label.slice(0, 3)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                            lineNumber: 1240,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, option.id, true, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 1220,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                            lineNumber: 1214,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center justify-between gap-3 ${isPage ? "mt-3" : "mt-4"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `inline-flex rounded-full border-2 p-1 text-sm ${isPage ? "border-blue-400 bg-white/15 backdrop-blur-md shadow-md" : "border-[#d9e7fb] bg-white shadow-[0_8px_24px_rgba(15,97,229,0.06)]"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>switchMode("login"),
                                    className: `rounded-full font-semibold transition-colors ${isPage ? "px-4 py-1.5" : "px-4 py-2"} ${mode === "login" ? isPage ? "bg-blue-500 text-white" : "bg-[#0f61e5] text-white" : isPage ? "text-white/70 hover:text-white" : "text-[#5e708d]"}`,
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1248,
                                columnNumber: 11
                            }, this),
                            mode !== "forgot" && mode !== "reset" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>switchMode("forgot"),
                                className: `text-sm font-semibold transition-colors ${isPage ? "text-cyan-300 hover:text-white" : "text-[#0f61e5] hover:text-[#084db8]"}`,
                                children: "Forgot?"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1263,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>switchMode("login"),
                                className: "text-sm font-semibold text-[#0f61e5] transition-colors hover:text-[#084db8]",
                                children: "Back to login"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative rounded-[28px] border border-[#e2ebf7] bg-white shadow-[0_18px_40px_rgba(15,97,229,0.08)] ${isPage ? "mt-4 p-4 lg:p-4" : "mt-5 p-4 sm:p-5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-4 top-4 h-24 w-24 rounded-full bg-[#edf4ff] opacity-80 blur-2xl"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,97,229,0.18),transparent)]"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1283,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex shrink-0 items-center justify-center rounded-[18px] ${isPage ? "h-11 w-11" : "h-12 w-12"}`,
                                                style: {
                                                    backgroundColor: selectedRole.softAccent,
                                                    color: selectedRole.accent
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectedIcon, {
                                                    className: isPage ? "text-base" : "text-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                    lineNumber: 1291,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1287,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7a8ca5]",
                                                        children: selectedRole.eyebrow
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 1294,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: `mt-1 font-serif font-bold leading-tight text-[#0d1b2a] ${isPage ? "text-[1.55rem]" : "text-[1.8rem]"}`,
                                                        children: MODE_LABELS[mode]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 1297,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-[#5c6d86] ${isPage ? "mt-1.5 text-[13px] leading-5" : "mt-2 text-sm leading-6"}`,
                                                        children: selectedRole.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 1300,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1293,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1286,
                                        columnNumber: 13
                                    }, this),
                                    isPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap gap-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$auth$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].map((option)=>{
                                            const Icon = option.icon;
                                            const active = option.id === role;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${active ? "border-[#b9d1fb] bg-[#edf4ff] text-[#0f61e5]" : "border-[#e0e8f5] bg-[#f9fbff] text-[#61748f]"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "text-[11px]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                        lineNumber: 1321,
                                                        columnNumber: 23
                                                    }, this),
                                                    option.label
                                                ]
                                            }, `${option.id}-chip`, true, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1313,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1307,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                initial: false,
                                children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    className: `rounded-2xl border px-4 py-3 text-sm ${isPage ? "border-red-400/50 bg-red-500/20 text-red-100" : "border-red-200 bg-red-50 text-red-600"} ${isPage ? "mt-3" : "mt-4"}`,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 1332,
                                    columnNumber: 15
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                initial: false,
                                children: success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    className: `rounded-2xl border px-4 py-3 text-sm ${isPage ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-100" : "border-emerald-200 bg-emerald-50 text-emerald-700"} ${isPage ? "mt-3" : "mt-4"}`,
                                    children: success
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                    lineNumber: 1349,
                                    columnNumber: 15
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1347,
                                columnNumber: 11
                            }, this),
                            providerHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-2xl border px-4 py-3 text-sm ${isPage ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-100" : "border-blue-200 bg-blue-50 text-blue-700"} ${isPage ? "mt-3" : "mt-4"}`,
                                children: providerHint
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1365,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.22
                                },
                                className: isPage ? "mt-3.5" : "mt-5",
                                children: [
                                    mode === "login" && renderLoginForm(),
                                    mode === "signup" && renderSignupForm(),
                                    mode === "forgot" && renderForgotForm(),
                                    mode === "reset" && renderResetForm()
                                ]
                            }, `${mode}-${role}`, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1374,
                                columnNumber: 11
                            }, this),
                            mode === "login" || mode === "signup" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center gap-3 ${isPage ? "my-3.5" : "my-5"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-px flex-1 ${isPage ? "bg-blue-400/50" : "bg-[#e3ebf8]"}`
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-xs font-semibold uppercase tracking-[0.2em] ${isPage ? "text-white/80" : "text-[#8aa0bc]"}`,
                                                children: "or continue with"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-px flex-1 ${isPage ? "bg-blue-400/50" : "bg-[#e3ebf8]"}`
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleGoogleContinue,
                                        className: `flex w-full items-center justify-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${isPage ? "border-blue-400 bg-white/15 backdrop-blur-md text-black hover:bg-white/25 hover:border-blue-300" : "border-[#d7e3f4] bg-white text-[#22314a] shadow-[0_10px_24px_rgba(15,97,229,0.05)] hover:border-[#0f61e5] hover:text-[#0f61e5]"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FcGoogle"], {
                                                className: "text-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                                lineNumber: 1406,
                                                columnNumber: 17
                                            }, this),
                                            mode === "signup" ? `Start ${selectedRole.label} signup with Google` : `Continue as ${selectedRole.label} with Google`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1397,
                                        columnNumber: 15
                                    }, this),
                                    !isPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-center text-xs leading-5 text-[#7a8ca5]",
                                        children: "Google can speed things up, but role-specific school details still stay in your portal profile."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1413,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true) : null,
                            !isPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 border-t border-[#e3ebf8] pt-4 text-[13px] leading-6 text-[#677a95]",
                                children: [
                                    "Protected access for ",
                                    selectedRole.label.toLowerCase(),
                                    " accounts. Need personal help?",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        className: "font-semibold text-[#0f61e5] transition-colors hover:text-[#084db8]",
                                        children: "Contact support"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                        lineNumber: 1423,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                                lineNumber: 1421,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                        lineNumber: 1281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
                lineNumber: 1212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/auth/AuthPanel.tsx",
        lineNumber: 1176,
        columnNumber: 5
    }, this);
}
_s(AuthPanel, "jG0/RuqeMDHvtfKYjiWIWwHYeJ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AuthPanel;
var _c;
__turbopack_refresh__.register(_c, "AuthPanel");

})()),
"[project]/frontend/components/auth/LoginForm.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>LoginForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/dom/motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$AuthPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/frontend/components/auth/AuthPanel.tsx [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
function LoginForm() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#dfeaff_0%,#eef5ff_42%,#f8fbff_100%)] pb-8 pt-20 sm:pt-28 lg:pb-10 lg:pt-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            scale: [
                                1,
                                1.12,
                                1
                            ],
                            opacity: [
                                0.28,
                                0.42,
                                0.28
                            ]
                        },
                        transition: {
                            duration: 8,
                            repeat: Infinity
                        },
                        className: "absolute -left-20 top-8 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            scale: [
                                1.18,
                                1,
                                1.18
                            ],
                            opacity: [
                                0.24,
                                0.36,
                                0.24
                            ]
                        },
                        transition: {
                            duration: 10,
                            repeat: Infinity,
                            delay: 1
                        },
                        className: "absolute -right-28 top-14 h-96 w-96 rounded-full bg-brand-green/20 blur-[110px]"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            scale: [
                                1,
                                1.1,
                                1
                            ],
                            opacity: [
                                0.16,
                                0.28,
                                0.16
                            ]
                        },
                        transition: {
                            duration: 12,
                            repeat: Infinity,
                            delay: 2
                        },
                        className: "absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-brand-blue-light/15 blur-[120px]"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[linear-gradient(rgba(21,101,192,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(21,101,192,0.05)_1px,transparent_1px)] bg-[size:74px_74px] opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto flex w-full max-w-full items-start justify-center px-4 py-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 24,
                        scale: 0.98
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    transition: {
                        duration: 0.7,
                        ease: "easeOut"
                    },
                    className: "w-full max-w-[27rem] overflow-visible border-0 bg-transparent shadow-none lg:max-w-[1180px] lg:overflow-hidden lg:rounded-[34px] lg:border lg:border-white/80 lg:bg-white lg:shadow-[0_40px_140px_rgba(7,24,41,0.18)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$auth$2f$AuthPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "page"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/auth/LoginForm.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/auth/LoginForm.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = LoginForm;
var _c;
__turbopack_refresh__.register(_c, "LoginForm");

})()),
"[project]/src/app/login/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=_f2c74d._.js.map