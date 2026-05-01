# Login System Documentation

## Overview

The Amet School website now includes a unified login system for Students, Parents, and Faculty members. The system uses JWT-based authentication with MongoDB for data persistence.

## Features

✅ **Unified Login Page** - Single login page for all three user types
✅ **Role-Based Authentication** - Separate authentication for Student, Parent, and Faculty
✅ **Secure Password Hashing** - Uses bcryptjs for password security
✅ **JWT Tokens** - Token-based authentication with HTTP-only cookies
✅ **Protected Dashboards** - Role-specific dashboards for each user type
✅ **Session Management** - Automatic logout and session handling

## Folder Structure

```
src/
├── models/
│   ├── Student.ts          # Student user model with password hashing
│   ├── Parent.ts           # Parent user model with password hashing
│   ├── FacultyLogin.ts     # Faculty authentication model
│   └── AdminUser.ts        # (Existing) Admin user model
│
├── app/
│   ├── login/
│   │   └── page.tsx            # Main unified login page
│   ├── student/dashboard/
│   │   ├── layout.tsx          # Student dashboard layout with auth
│   │   └── page.tsx            # Student dashboard content
│   ├── parent/dashboard/
│   │   ├── layout.tsx          # Parent dashboard layout with auth
│   │   └── page.tsx            # Parent dashboard content
│   ├── faculty/dashboard/
│   │   ├── layout.tsx          # Faculty dashboard layout with auth
│   │   └── page.tsx            # Faculty dashboard content
│   └── api/auth/
│       ├── student/login/
│       │   └── route.ts        # Student login API
│       ├── parent/login/
│       │   └── route.ts        # Parent login API
│       ├── faculty/login/
│       │   └── route.ts        # Faculty login API
│       ├── me/
│       │   └── route.ts        # Get current user info (updated)
│       └── logout/
│           └── route.ts        # Logout endpoint (updated)
│
└── components/
    ├── auth/
    │   └── LoginForm.tsx    # Unified login form with role selection
    └── layout/
        └── Navbar.tsx       # (Updated) Added login link
```

## How to Use

### 1. **Creating Student Account**

Students can create an account via admin panel with the following fields:
- Email (unique)
- Password (min 8 characters)
- Full Name
- Roll Number (unique)
- Class
- Parent Email (optional)
- Phone (optional)

### 2. **Creating Parent Account**

Parents can create an account with:
- Email (unique)
- Password (min 8 characters)
- Parent Name
- Phone Number
- Children Names (optional)

### 3. **Creating Faculty Account**

Faculty members need:
- Email (unique)
- Password (min 8 characters)
- Name
- Designation

### Login Flow

1. User navigates to `/login`
2. Selects their role (Student, Parent, or Faculty)
3. Enters email and password
4. System authenticates against the appropriate model
5. JWT token is generated and stored in HTTP-only cookie
6. User is redirected to their role-specific dashboard

### Logout Flow

1. User clicks logout button on dashboard
2. `POST /api/auth/logout` is called
3. Auth token cookie is cleared
4. User is redirected to home page

### Session Management

- Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN` env var)
- Dashboard layouts check authentication on mount
- Unauthorized users are redirected to login page
- Current user info available via `GET /api/auth/me`

## Environment Variables

Add these to your `.env.local` file:

```env
# JWT Configuration
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/amet-school

# Node Environment
NODE_ENV=development
```

## API Endpoints

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/student/login` | POST | Authenticate student |
| `/api/auth/parent/login` | POST | Authenticate parent |
| `/api/auth/faculty/login` | POST | Authenticate faculty |
| `/api/auth/me` | GET | Get current user info |
| `/api/auth/logout` | POST | Logout user |

### Request/Response Examples

**Student Login Request:**
```json
POST /api/auth/student/login
{
  "email": "student@school.com",
  "password": "password123"
}
```

**Login Response (Success):**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "student@school.com",
    "role": "student",
    "rollNumber": "2024-001",
    "class": "10A"
  }
}
```

**Login Response (Error):**
```json
{
  "success": false,
  "error": "Invalid credentials."
}
```

## Testing the System

### Create Test Users

You can create test users through the MongoDB connection:

**Student:**
```javascript
db.students.insertOne({
  email: "student@example.com",
  password: "hashed_password", // Use bcrypt to hash
  name: "Test Student",
  rollNumber: "2024-001",
  class: "10A"
})
```

**Parent:**
```javascript
db.parents.insertOne({
  email: "parent@example.com",
  password: "hashed_password",
  name: "Test Parent",
  phone: "9876543210"
})
```

**Faculty:**
```javascript
db.facultylogins.insertOne({
  email: "faculty@example.com",
  password: "hashed_password",
  facultyId: ObjectId("..."),
  name: "Test Faculty",
  designation: "Mathematics Teacher"
})
```

### Navigation

- **Login Page:** `/login`
- **Student Dashboard:** `/student/dashboard`
- **Parent Dashboard:** `/parent/dashboard`
- **Faculty Dashboard:** `/faculty/dashboard`

## Security Features

✅ **Password Hashing** - Uses bcryptjs with salt rounds
✅ **HTTP-Only Cookies** - Tokens stored securely
✅ **JWT Verification** - All protected routes verify JWT
✅ **CSRF Protection** - Ready for CSRF middleware integration
✅ **Role-Based Access** - Each user type has isolated endpoints
✅ **Secure Production Mode** - Cookies marked as secure in production

## Customization

### Change Token Expiry
Update `JWT_EXPIRES_IN` in `.env.local` or in the `signToken()` function in `src/lib/auth.ts`.

### Change Cookie Settings
Modify cookie options in the login routes:
```typescript
res.cookies.set("auth_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
});
```

### Customize Dashboards
Each dashboard layout is located in:
- `src/app/student/dashboard/layout.tsx`
- `src/app/parent/dashboard/layout.tsx`
- `src/app/faculty/dashboard/layout.tsx`

Update the content pages for actual functionality.

## Next Steps

1. ✅ Create admin panel to manage users
2. ✅ Implement password reset functionality
3. ✅ Add email verification on signup
4. ✅ Create user profile management pages
5. ✅ Implement dashboard features based on user role
6. ✅ Add audit logging for security events

## Troubleshooting

### Issue: "Unauthorized" error when accessing dashboard
- **Solution:** Check if JWT token is correctly set in cookies
- Run: `GET /api/auth/me` to verify token validity

### Issue: Login works but redirect fails
- **Solution:** Ensure dashboard route exists and layout is properly setup
- Check browser console for errors

### Issue: Logout clears cookie but user can still access admin
- **Solution:** Admin uses different cookie (`admin_token` vs `auth_token`)
- Check the logout route to ensure both cookies are cleared

## Support

For issues or questions, refer to the code comments in:
- `src/lib/auth.ts` - Authentication utilities
- `src/components/auth/LoginForm.tsx` - Login form implementation
- API route files in `src/app/api/auth/`
