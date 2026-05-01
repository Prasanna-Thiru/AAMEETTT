# Quick Setup Guide - Login System

## Step 1: Environment Configuration

Add these variables to your `.env.local` file:

```env
# JWT Authentication
JWT_SECRET=your_jwt_secret_key_at_least_32_characters_long_for_security
JWT_EXPIRES_IN=7d

# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/amet-school?retryWrites=true&w=majority

# Node Environment
NODE_ENV=development
```

## Step 2: Install Dependencies

Ensure all required packages are installed:
```bash
npm install jsonwebtoken bcryptjs moment dotenv
```

## Step 3: Database Collections

MongoDB will automatically create these collections:

1. **students** - For student authentication
2. **parents** - For parent authentication
3. **facultylogins** - For faculty authentication

## Step 4: Create Test Users

Use MongoDB Compass or mongosh to insert test documents:

### Test Student
```javascript
db.students.insertOne({
  email: "student@test.com",
  password: "$2a$12$...", // bcrypt hashed password
  name: "test student",
  rollNumber: "2024-001",
  class: "10A",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Test Parent
```javascript
db.parents.insertOne({
  email: "parent@test.com",
  password: "$2a$12$...", // bcrypt hashed password
  name: "test parent",
  phone: "9876543210",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Test Faculty
```javascript
db.facultylogins.insertOne({
  email: "faculty@test.com",
  password: "$2a$12$...", // bcrypt hashed password
  name: "test faculty",
  facultyId: ObjectId("..."), // Existing faculty ID
  designation: "Senior Teacher",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**To generate bcrypt password, run in Node:**
```bash
node -e "require('bcryptjs').hash('password123', 12).then(console.log)"
```

## Step 5: Test the Login System

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to login page:**
   - Open: `http://localhost:3000/login`

3. **Test Each Role:**
   - Select "Student" → Enter student@test.com / password123
   - Select "Parent" → Enter parent@test.com / password123
   - Select "Faculty" → Enter faculty@test.com / password123

4. **Verify Redirects:**
   - Student → `/student/dashboard`
   - Parent → `/parent/dashboard`
   - Faculty → `/faculty/dashboard`

## Step 6: Add Login Link to Navbar

✅ **Already done!** The navbar now includes:
- Desktop: "Login" button with border styling
- Mobile: "Student / Parent / Faculty Login" CTA button

## File Checklist

✅ Models Created:
- `src/models/Student.ts`
- `src/models/Parent.ts`
- `src/models/FacultyLogin.ts`

✅ API Routes Created:
- `src/app/api/auth/student/login/route.ts`
- `src/app/api/auth/parent/login/route.ts`
- `src/app/api/auth/faculty/login/route.ts`

✅ API Routes Updated:
- `src/app/api/auth/me/route.ts` (supports all roles)
- `src/app/api/auth/logout/route.ts` (clears all tokens)

✅ Pages Created:
- `src/app/login/page.tsx` (main login page)
- `src/app/student/dashboard/page.tsx`
- `src/app/parent/dashboard/page.tsx`
- `src/app/faculty/dashboard/page.tsx`

✅ Layouts Created:
- `src/app/student/dashboard/layout.tsx`
- `src/app/parent/dashboard/layout.tsx`
- `src/app/faculty/dashboard/layout.tsx`

✅ Components Created:
- `src/components/auth/LoginForm.tsx` (unified login form)

✅ Files Updated:
- `src/components/layout/Navbar.tsx` (added login link)
- `src/types/index.ts` (added new user types)
- `src/lib/auth.ts` (no changes needed, already compatible)

## Dashboard Features

Each dashboard includes:
- User welcome message
- Logout functionality
- Role-specific content cards
- Protected routes (redirects to login if not authenticated)

### Student Dashboard
- Subjects view
- Attendance tracking
- Grade book
- Assignments
- Announcements

### Parent Dashboard
- Child's academic progress
- Attendance reports
- Teacher communication
- School events
- Fees & payments

### Faculty Dashboard
- Class management
- Grade management
- Attendance marking
- Assignment creation
- Parent communication

## Troubleshooting

**Issue: 400 Bad Request on login**
- Check that email and password are not empty
- Verify user exists in database with correct email

**Issue: 401 Unauthorized**
- Password might be wrong
- User might not exist in selected role model

**Issue: Can't access dashboard**
- Verify you're logged in with `/api/auth/me` endpoint
- Check browser cookies for `auth_token`
- Clear cookies and try logging in again

**Issue: Token expired error**
- Logout and login again
- Adjust `JWT_EXPIRES_IN` in `.env.local` if needed

## Next Steps

1. **Create an admin panel** to manage Student/Parent/Faculty users
2. **Implement password reset** via email
3. **Add email verification** on signup
4. **Customize dashboards** with real data
5. **Add user profile** management pages
6. **Implement role permissions** for feature access

## Support Commands

```bash
# Generate bcrypt hash for password
node -e "require('bcryptjs').hash('password123', 12).then(console.log)"

# Check environment variables
cat .env.local

# View MongoDB collections
# Connect to MongoDB and run: db.getCollectionNames()
```

---

**Last Updated:** April 8, 2026
**System Status:** ✅ Ready for Testing
