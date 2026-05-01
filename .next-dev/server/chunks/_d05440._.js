module.exports = {

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
"[project]/backend/lib/googleSheets.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Helper to send form data to a Google Sheets Apps Script Webhook
__turbopack_esm__({
    "pushToGoogleSheets": ()=>pushToGoogleSheets
});
async function pushToGoogleSheets(formType, data) {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local! Skipping Google Sheets update.");
        return;
    }
    try {
        // Normalize data so every form has the EXACT same keys for Google Sheets headers to pick up identically
        const payload = {
            "Timestamp": new Date().toLocaleString(),
            "Form Type": formType,
            "Name": data.name || data.parentName || "-",
            "Student Name": data.studentName || "-",
            "Email": data.email || "-",
            "Phone": data.phone || data.contactNumber || "-",
            "Class Applied": data.classApplying || "-",
            "Schooling": data.schoolingType || "-",
            "Enquiry Type": data.enquiryType || data.role || "-",
            "Message": data.message || "-",
            "Source": data.source || "-"
        };
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            console.error("Google Sheets Webhook failed with status:", response.status);
        } else {
            const text = await response.text();
            console.log("Google Sheets response:", text);
        }
    } catch (error) {
        console.error(`Failed to push ${formType} to Google Sheets:`, error);
    }
}

})()),
"[project]/backend/api/admissions/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET,
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/lib/googleSheets.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { parentName, studentName, classApplying, schoolingType, contactNumber, email, message } = body;
        if (!parentName || !studentName || !classApplying || !schoolingType || !contactNumber || !email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "All required fields must be filled."
            }, {
                status: 400
            });
        }
        // Google Sheets integration — don't block response
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$googleSheets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pushToGoogleSheets"])("Admissions", {
            parentName,
            studentName,
            classApplying,
            schoolingType,
            contactNumber,
            email,
            message
        }).catch(console.error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                id: "sheet-only-" + Date.now()
            },
            message: "Application submitted successfully."
        }, {
            status: 201
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Server error. Please try again."
        }, {
            status: 500
        });
    }
}
async function GET(req) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAdminAuth"])(req);
        // Since we're using Google Sheets exclusively, return an empty array to prevent dashboard crashes
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: []
        });
    } catch (err) {
        const status = err.message?.includes("Unauthorized") ? 401 : 500;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: err.message
        }, {
            status
        });
    }
}

})()),
"[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/api/admissions/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <exports>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GET"],
    "POST": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["POST"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/backend/api/admissions/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <facade>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["GET"],
    "POST": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["POST"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admissions$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/src/app/api/admissions/route.ts [app-route] (ecmascript) <exports>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),

};

//# sourceMappingURL=_d05440._.js.map