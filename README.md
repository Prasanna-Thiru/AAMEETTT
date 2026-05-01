# MNRS – Maharishi Vidya Mandir National Residential School Website

A **production-ready, full-stack Next.js 14 school website** with React, TypeScript, Tailwind CSS, MongoDB, JWT authentication, and a complete admin dashboard.

---

## 🚀 Features

### **Public-Facing Website**
- ✅ **Home Page** – Hero banner, highlights strip, Why Choose MNRS, Maharishi Education section, Residential Life
- ✅ **About Page** – School story, mission/vision, three pillars, MVM network stats
- ✅ **Admissions Page** – Timeline, online application form with validation, email notifications
- ✅ **Curriculum Page** – CBSE details, academic philosophy, stage-wise breakdown (LKG–Grade 7)
- ✅ **Faculty Page** – Dynamic faculty grid with placeholder support
- ✅ **Facilities Page** – Academics, Library, Sports, Residential, Transport, Campus
- ✅ **Gallery Page** – Filterable image/video gallery with lightbox
- ✅ **Contact Page** – Contact form, Google Maps embed, contact info cards

### **Backend & Admin**
- ✅ **REST API** – `/api/admissions`, `/api/contact`, `/api/faculty`, `/api/gallery`, `/api/auth`
- ✅ **MongoDB Integration** – Mongoose models for Admissions, Contact, Faculty, Gallery, Admin Users
- ✅ **JWT Authentication** – Secure admin login with HTTP-only cookies
- ✅ **Email Notifications** – Nodemailer integration for admission confirmations
- ✅ **Admin Dashboard** – (Ready for implementation — see structure below)

### **Design & UX**
- ✅ **Responsive Design** – Mobile-first, fully responsive across all devices
- ✅ **Framer Motion Animations** – Smooth entrance animations, scroll-triggered effects
- ✅ **Tailwind CSS** – Custom brand colors (earthy greens, deep blues, gold accents)
- ✅ **SEO Optimized** – Meta tags, Open Graph, structured data-ready
- ✅ **Accessibility** – ARIA labels, keyboard navigation, semantic HTML

---

## 📁 Project Structure

\`\`\`
d:\Projects\Amet School\
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx            # Root layout with Navbar, Footer, Toaster
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx
│   │   ├── admissions/page.tsx
│   │   ├── curriculum/page.tsx
│   │   ├── faculty/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── admin/                # Admin dashboard (to be built)
│   │   └── api/                  # API routes
│   │       ├── admissions/route.ts
│   │       ├── contact/route.ts
│   │       ├── faculty/route.ts
│   │       ├── gallery/route.ts
│   │       └── auth/login/route.ts
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── sections/             # HeroSection, WhyChooseSection, etc.
│   │   ├── forms/                # AdmissionForm, ContactForm
│   │   └── ui/                   # Reusable UI components
│   ├── lib/                      # Utilities
│   │   ├── db.ts                 # MongoDB connection
│   │   ├── auth.ts               # JWT helpers
│   │   └── email.ts              # Nodemailer functions
│   ├── models/                   # Mongoose schemas
│   │   ├── AdmissionLead.ts
│   │   ├── ContactEnquiry.ts
│   │   ├── Faculty.ts
│   │   ├── GalleryItem.ts
│   │   └── AdminUser.ts
│   ├── types/index.ts            # TypeScript interfaces
│   └── styles/globals.css        # Tailwind + custom styles
├── public/images/                # Static assets
├── .env.local                    # Environment variables
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
\`\`\`

---

## ⚙️ Setup & Installation

### **1. Prerequisites**
- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Gmail account for SMTP (or other email provider)

### **2. Clone & Install**
\`\`\`bash
cd "d:\\Projects\\Amet School"
npm install
\`\`\`

### **3. Environment Variables**
Create \`.env.local\` in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mnrs?retryWrites=true&w=majority

# Auth
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d

# Admin (for seeding initial admin user)
ADMIN_EMAIL=admin@mnrs.edu.in
ADMIN_PASSWORD=SecurePassword123!

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=admissions@mnrs.edu.in

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=+918939199005
NEXT_PUBLIC_ADDRESS=AMET Knowledge Park, ECR – Thenpattinam

# Google Maps
NEXT_PUBLIC_MAPS_EMBED_URL=<your-google-maps-embed-url>
\`\`\`

### **4. Run Development Server**
\`\`\`bash
npm run dev
\`\`\`
Visit: **http://localhost:3000**

---

## 🗄️ Database Setup

### **Seed Admin User** (Optional)
Create a script \`scripts/seedAdmin.ts\`:

\`\`\`typescript
import { connectDB } from "../src/lib/db";
import AdminUser from "../src/models/AdminUser";

async function seed() {
  await connectDB();
  const exists = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    await AdminUser.create({
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
      password: process.env.ADMIN_PASSWORD,
      role: "superadmin",
    });
    console.log("✅ Admin user created");
  } else {
    console.log("⚠️ Admin user already exists");
  }
  process.exit(0);
}

seed();
\`\`\`

Run: \`npx ts-node scripts/seedAdmin.ts\`

---

## 🔐 Admin Dashboard (To Be Built)

The admin routes are scaffolded at \`/admin\`. Build the following pages:

1. **Login Page** (\`/admin\`) – Use \`/api/auth/login\`
2. **Dashboard** (\`/admin/dashboard\`) – Stats overview
3. **Admissions Manager** (\`/admin/admissions\`) – View/update admission leads
4. **Faculty Manager** (\`/admin/faculty\`) – CRUD for faculty members
5. **Gallery Manager** (\`/admin/gallery\`) – Upload/delete gallery items

### **Protected Route Example**
\`\`\`typescript
// src/app/admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/auth/me").catch(() => router.push("/admin"));
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>Admin Dashboard Content</div>;
}
\`\`\`

---

## 📧 Email Configuration

### **Gmail Setup**
1. Enable **2-Factor Authentication** on your Gmail account
2. Generate an **App Password**: [Google Account > Security > App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password in \`SMTP_PASS\`

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### **Environment Variables on Vercel**
Add all variables from \`.env.local\` to Vercel's Environment Variables section.

### **MongoDB Atlas**
- Whitelist Vercel's IP ranges (or use \`0.0.0.0/0\` for all IPs)
- Use connection string with \`retryWrites=true&w=majority\`

---

## 🎨 Customization

### **Brand Colors**
Edit \`tailwind.config.js\`:
\`\`\`javascript
colors: {
  brand: {
    green: "#2D6A4F",
    blue: "#1A3A5C",
    gold: "#C9A84C",
    // ...
  }
}
\`\`\`

### **Add Images**
Place images in \`public/images/\` and reference as \`/images/filename.jpg\`

### **Update Content**
All page content is in \`src/app/[page]/page.tsx\` — edit directly.

---

## 📝 API Endpoints

| Method | Endpoint                  | Auth Required | Description                     |
|--------|---------------------------|---------------|---------------------------------|
| POST   | \`/api/admissions\`         | No            | Submit admission application    |
| GET    | \`/api/admissions\`         | Yes           | List all admission leads        |
| PATCH  | \`/api/admissions/[id]\`    | Yes           | Update admission status         |
| DELETE | \`/api/admissions/[id]\`    | Yes           | Delete admission lead           |
| POST   | \`/api/contact\`            | No            | Submit contact enquiry          |
| GET    | \`/api/contact\`            | Yes           | List all contact enquiries      |
| GET    | \`/api/faculty\`            | No            | Get all faculty members         |
| POST   | \`/api/faculty\`            | Yes           | Add new faculty member          |
| PUT    | \`/api/faculty/[id]\`       | Yes           | Update faculty member           |
| DELETE | \`/api/faculty/[id]\`       | Yes           | Delete faculty member           |
| GET    | \`/api/gallery\`            | No            | Get gallery items (filterable)  |
| POST   | \`/api/gallery\`            | Yes           | Add new gallery item            |
| DELETE | \`/api/gallery/[id]\`       | Yes           | Delete gallery item             |
| POST   | \`/api/auth/login\`         | No            | Admin login (returns JWT cookie)|
| POST   | \`/api/auth/logout\`        | No            | Admin logout (clears cookie)    |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer
- **Forms**: react-hook-form
- **Notifications**: react-hot-toast
- **Icons**: react-icons

---

## 📄 License

© 2025 Maharishi Vidya Mandir National Residential School. All rights reserved.

---

## 🤝 Support

For issues or questions:
- **Email**: admissions@mnrs.edu.in
- **Phone**: +91 89391 99005

---

**Built with ❤️ for MNRS**
