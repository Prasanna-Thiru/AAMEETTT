module.exports = {

"[project]/database/lib/db.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "connectDB": ()=>connectDB
});
var __TURBOPACK__commonjs__external__mongoose__ = __turbopack_external_require__("mongoose", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}
// Cached connection to avoid re-connecting on every hot reload in dev
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = __TURBOPACK__commonjs__external__mongoose__["default"].connect(MONGODB_URI, {
            bufferCommands: false
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

})()),
"[project]/backend/lib/auth.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getAdminTokenFromRequest": ()=>getAdminTokenFromRequest,
    "getAnyTokenFromRequest": ()=>getAnyTokenFromRequest,
    "getUserTokenFromRequest": ()=>getUserTokenFromRequest,
    "requireAdminAuth": ()=>requireAdminAuth,
    "signToken": ()=>signToken,
    "verifyToken": ()=>verifyToken
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const JWT_SECRET = process.env.JWT_SECRET;
function signToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
}
function verifyToken(token) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
}
function getAdminTokenFromRequest(req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
    return req.cookies.get("admin_token")?.value ?? null;
}
function getUserTokenFromRequest(req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
    return req.cookies.get("auth_token")?.value ?? null;
}
function getAnyTokenFromRequest(req) {
    return getUserTokenFromRequest(req) ?? getAdminTokenFromRequest(req);
}
function requireAdminAuth(req) {
    const token = getAdminTokenFromRequest(req);
    if (!token) throw new Error("Unauthorized: No token provided");
    const payload = verifyToken(token);
    if (![
        "superadmin",
        "editor"
    ].includes(payload.role)) {
        throw new Error("Unauthorized: Admin access required");
    }
    return payload;
}

})()),
"[project]/database/models/Student.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__mongoose__ = __turbopack_external_require__("mongoose", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const StudentSchema = new __TURBOPACK__commonjs__external__mongoose__["Schema"]({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    parentEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String
    }
}, {
    timestamps: true
});
// Hash password before save
StudentSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, 12);
    next();
});
StudentSchema.methods.comparePassword = function(candidate) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidate, this.password);
};
const Student = __TURBOPACK__commonjs__external__mongoose__["default"].models.Student || __TURBOPACK__commonjs__external__mongoose__["default"].model("Student", StudentSchema);
const __TURBOPACK__default__export__ = Student;

})()),
"[project]/database/models/Parent.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__mongoose__ = __turbopack_external_require__("mongoose", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const ParentSchema = new __TURBOPACK__commonjs__external__mongoose__["Schema"]({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    childrenNames: {
        type: [
            String
        ],
        default: []
    }
}, {
    timestamps: true
});
// Hash password before save
ParentSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, 12);
    next();
});
ParentSchema.methods.comparePassword = function(candidate) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidate, this.password);
};
const Parent = __TURBOPACK__commonjs__external__mongoose__["default"].models.Parent || __TURBOPACK__commonjs__external__mongoose__["default"].model("Parent", ParentSchema);
const __TURBOPACK__default__export__ = Parent;

})()),
"[project]/database/models/Faculty.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__mongoose__ = __turbopack_external_require__("mongoose", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
const FacultySchema = new __TURBOPACK__commonjs__external__mongoose__["Schema"]({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
const Faculty = __TURBOPACK__commonjs__external__mongoose__["default"].models.Faculty || __TURBOPACK__commonjs__external__mongoose__["default"].model("Faculty", FacultySchema);
const __TURBOPACK__default__export__ = Faculty;

})()),
"[project]/database/models/FacultyLogin.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__mongoose__ = __turbopack_external_require__("mongoose", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const FacultyLoginSchema = new __TURBOPACK__commonjs__external__mongoose__["Schema"]({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    facultyId: {
        type: __TURBOPACK__commonjs__external__mongoose__["Schema"].Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
// Hash password before save
FacultyLoginSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, 12);
    next();
});
FacultyLoginSchema.methods.comparePassword = function(candidate) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidate, this.password);
};
const FacultyLogin = __TURBOPACK__commonjs__external__mongoose__["default"].models.FacultyLogin || __TURBOPACK__commonjs__external__mongoose__["default"].model("FacultyLogin", FacultyLoginSchema);
const __TURBOPACK__default__export__ = FacultyLogin;

})()),
"[project]/backend/api/auth/signup/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/database/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Student$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/database/models/Student.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Parent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/database/models/Parent.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Faculty$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/database/models/Faculty.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$FacultyLogin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/database/models/FacultyLogin.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const REDIRECT_MAP = {
    student: "/student/dashboard",
    parent: "/parent/dashboard",
    faculty: "/faculty/dashboard"
};
function setLoginCookies(res, token) {
    res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
    res.cookies.set("newsletter_prompt", "1", {
        httpOnly: false,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: 60 * 10,
        path: "/"
    });
}
function normalizeChildrenNames(value) {
    if (Array.isArray(value)) {
        return value.map((item)=>String(item).trim()).filter(Boolean);
    }
    if (typeof value === "string") {
        return value.split(",").map((item)=>item.trim()).filter(Boolean);
    }
    return [];
}
async function POST(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const body = await req.json();
        const role = body.role;
        const email = String(body.email || "").toLowerCase().trim();
        const password = String(body.password || "");
        const name = String(body.name || "").trim();
        if (![
            "student",
            "parent",
            "faculty"
        ].includes(role)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Please choose a valid account type."
            }, {
                status: 400
            });
        }
        if (!email || !password || !name) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Name, email, and password are required."
            }, {
                status: 400
            });
        }
        if (password.length < 8) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Password must be at least 8 characters."
            }, {
                status: 400
            });
        }
        if (role === "student") {
            const rollNumber = String(body.rollNumber || "").trim();
            const className = String(body.className || body.class || "").trim();
            const parentEmail = body.parentEmail ? String(body.parentEmail).toLowerCase().trim() : "";
            const phone = body.phone ? String(body.phone).trim() : "";
            if (!rollNumber || !className) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "Roll number and class are required for student signup."
                }, {
                    status: 400
                });
            }
            const existingStudent = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Student$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                $or: [
                    {
                        email
                    },
                    {
                        rollNumber
                    }
                ]
            }).lean();
            if (existingStudent) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "A student account with that email or roll number already exists."
                }, {
                    status: 409
                });
            }
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Student$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                email,
                password,
                name,
                rollNumber,
                class: className,
                parentEmail,
                phone
            });
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signToken"])({
                id: user._id.toString(),
                email: user.email,
                role
            });
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    role,
                    rollNumber: user.rollNumber,
                    class: user.class
                },
                redirectTo: REDIRECT_MAP[role]
            }, {
                status: 201
            });
            setLoginCookies(res, token);
            return res;
        }
        if (role === "parent") {
            const phone = String(body.phone || "").trim();
            const childrenNames = normalizeChildrenNames(body.childrenNames);
            if (!phone) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "Phone number is required for parent signup."
                }, {
                    status: 400
                });
            }
            const existingParent = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Parent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                email
            }).lean();
            if (existingParent) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "A parent account with that email already exists."
                }, {
                    status: 409
                });
            }
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Parent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                email,
                password,
                name,
                phone,
                childrenNames
            });
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signToken"])({
                id: user._id.toString(),
                email: user.email,
                role
            });
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    role,
                    phone: user.phone,
                    childrenNames: user.childrenNames
                },
                redirectTo: REDIRECT_MAP[role]
            }, {
                status: 201
            });
            setLoginCookies(res, token);
            return res;
        }
        const designation = String(body.designation || "").trim();
        const subject = String(body.subject || "").trim();
        const qualification = String(body.qualification || "").trim();
        const experience = String(body.experience || "").trim();
        const bio = body.bio ? String(body.bio).trim() : "";
        const imageUrl = body.imageUrl ? String(body.imageUrl).trim() : "";
        if (!designation || !subject || !qualification || !experience) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Faculty signup needs designation, subject, qualification, and experience."
            }, {
                status: 400
            });
        }
        const existingFaculty = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$FacultyLogin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email
        }).lean();
        if (existingFaculty) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "A faculty account with that email already exists."
            }, {
                status: 409
            });
        }
        const facultyProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$Faculty$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            name,
            designation,
            subject,
            qualification,
            experience,
            bio,
            imageUrl
        });
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$models$2f$FacultyLogin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            facultyId: facultyProfile._id,
            email,
            password,
            name,
            designation
        });
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signToken"])({
            id: user._id.toString(),
            email: user.email,
            role
        });
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                role,
                designation: user.designation
            },
            redirectTo: REDIRECT_MAP[role]
        }, {
            status: 201
        });
        setLoginCookies(res, token);
        return res;
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: err.message || "Unable to create account right now."
        }, {
            status: 500
        });
    }
}

})()),
"[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/api/auth/signup/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["POST"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/api/auth/signup/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["POST"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f$signup$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/src/app/api/auth/signup/route.ts [app-route] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),

};

//# sourceMappingURL=_ba263d._.js.map