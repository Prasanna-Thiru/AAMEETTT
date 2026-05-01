# 🧪 BACKEND FIXES - QUICK TESTING GUIDE

**Last Updated:** May 1, 2026  
**Status:** Ready to test ✅

---

## 📋 What Was Fixed

✅ Email normalization (case sensitivity fix)  
✅ Database connection error handling  
✅ Error logging on all endpoints  
✅ Centralized cookie configuration  
✅ Error handler utilities  

---

## 🚀 HOW TO TEST

### 1️⃣ **Test Login with Email Variations**

**Test Case:** Login should work regardless of email case or whitespace

```
Admin Login Endpoint: http://localhost:3002/api/auth/login
Student Login: http://localhost:3002/api/auth/student/login
Parent Login: http://localhost:3002/api/auth/parent/login
Faculty Login: http://localhost:3002/api/auth/faculty/login
```

**Try These Variations:**
- ✅ `admin@mnrs.edu.in` (correct)
- ✅ `ADMIN@MNRS.EDU.IN` (all caps)
- ✅ ` admin@mnrs.edu.in ` (with spaces)
- ✅ ` ADMIN@MNRS.EDU.IN ` (caps + spaces)

**Expected Result:** ALL should login successfully (before fix: last 3 would fail)

**Using cURL:**
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":" ADMIN@MNRS.EDU.IN ","password":"Admin@123456"}'
```

---

### 2️⃣ **Check Error Logging**

**Where to Look:** Terminal running `npm run dev`

**Before Fix:**
```
❌ No error details in console
Login just returned: { success: false, error: "Server error." }
```

**After Fix:**
```
❌ Student login error: {
  message: "User not found",
  email: "admin@mnrs.edu.in",
  timestamp: "2026-05-01T12:00:00.000Z"
}
```

**How to Trigger Errors:**
1. Try login with wrong email → See specific error
2. Try login with wrong password → See specific error  
3. Kill MongoDB → See connection error (should be specific now)

---

### 3️⃣ **Test Database Connection**

**On App Startup:**
Look for this message in terminal:
```
✅ Connected to MongoDB
```

**If MongoDB is Down:**
Look for this message:
```
❌ MongoDB connection failed: {
  message: "getaddrinfo ENOTFOUND mnrs.hg6yavf.mongodb.net",
  code: "ENOTFOUND",
  name: "MongoServerSelectionError"
}
```

---

### 4️⃣ **Test Cookie Configuration**

**After Login/Signup:**

Open browser DevTools → Application → Cookies → http://localhost:3002

**Should See:**
```
✅ auth_token = (long jwt token)
✅ newsletter_prompt = 1
✅ Both have same secure/httpOnly settings
```

**Test Steps:**
1. Signup as new user
2. Check cookies are created
3. Logout (cookies should be cleared)
4. Login again
5. Cookies should be recreated identically

---

### 5️⃣ **Test New Error Handler Library**

The error handler utility is ready to use in new endpoints:

```typescript
import { logError, createErrorResponse } from "@/backend/lib/error-handler";

export async function POST(req: NextRequest) {
  try {
    // ... your code
  } catch (err) {
    logError("My Action", err, { email: user.email });
    return createErrorResponse("Something went wrong", 500);
  }
}
```

---

## 📊 TESTING CHECKLIST

### Functionality Tests
- [ ] Admin login with correct email/password
- [ ] Admin login with wrong password
- [ ] Admin login with UPPERCASE email
- [ ] Admin login with spaces around email
- [ ] Student signup and login
- [ ] Parent signup and login
- [ ] Faculty login (if user exists)
- [ ] Google OAuth login
- [ ] Logout clears tokens

### Error Visibility Tests
- [ ] Wrong credentials show error in console
- [ ] Database error shows specific message
- [ ] Check console logs during auth flow
- [ ] Invalid requests return proper status codes

### Cookie Tests
- [ ] After login: auth_token is set
- [ ] After login: newsletter_prompt is set
- [ ] After logout: cookies are cleared
- [ ] Cookie settings are consistent

### Database Tests
- [ ] MongoDB connects successfully (check startup log)
- [ ] Queries work (login/signup work)
- [ ] Connection timeout is set (5000ms)

---

## 🐛 DEBUGGING TIPS

### If Tests Fail

**1. Check Terminal Output**
```bash
# You should see detailed error messages like:
❌ Student login error: { message: "...", email: "...", timestamp: "..." }
```

**2. Check Browser Console (F12)**
- Click Network tab
- Try login
- Click the login request
- Look at Response tab for error details

**3. Check .env.local**
```bash
# Make sure these are set:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

**4. Restart Dev Server**
```bash
# Stop: Ctrl + C
# Start: npm run dev
```

---

## 📝 WHAT TO LOOK FOR IN LOGS

### ✅ Good Signs
```
✅ Connected to MongoDB
[Timestamp] Student login successful
[Timestamp] Token created
```

### ⚠️ Warning Signs
```
❌ MongoDB connection failed
❌ Login error: User not found
❌ Connection timeout
```

---

## 🔧 IF SOMETHING BREAKS

### MongoDB Connection Fails
1. Check MongoDB Atlas connection string in `.env.local`
2. Verify IP whitelist in MongoDB Atlas (Allow from anywhere)
3. Check username and password are correct
4. Test with MongoDB Atlas connection test tool

### Login Still Fails After Fix
1. Check if user actually exists in database
2. Verify password is correct
3. Check console for detailed error message
4. Try with different user account

### Cookies Not Being Set
1. Check browser DevTools → Application → Cookies
2. Verify site URL in `.env.local` matches current URL
3. Check if response headers include Set-Cookie

---

## 📚 FILES TO REVIEW

**New Files:**
- `backend/lib/auth-config.ts` - Configuration constants
- `backend/lib/error-handler.ts` - Error utilities
- `BACKEND_TESTING_REPORT.md` - Full issue analysis
- `FIXES_APPLIED.md` - Detailed fix documentation

**Modified Files:**
- `backend/api/auth/*/login/route.ts` - Email normalization
- `backend/api/auth/signup/route.ts` - Error logging
- `backend/api/auth/google/callback/route.ts` - Error logging
- `database/lib/db.ts` - Connection error handling

---

## ✅ NEXT STEPS

1. **Run the tests above** ← DO THIS FIRST
2. **Check console logs** during testing
3. **Report any errors** you see
4. Once passing, implement remaining high-priority fixes:
   - Password reset validation
   - Request input validation
   - Authentication on public routes

---

## 🎯 SUCCESS CRITERIA

All of these should work:
- ✅ Login works with various email formats
- ✅ Detailed errors appear in console
- ✅ Cookies are set correctly  
- ✅ Database connection errors are clear
- ✅ No generic "Server error" messages

---

**Need help?** Check `BACKEND_TESTING_REPORT.md` or `FIXES_APPLIED.md` for details.
