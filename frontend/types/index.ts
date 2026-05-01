// ─── Admission Lead ───────────────────────────────────────────────────────────
export interface AdmissionLead {
  _id?: string;
  parentName: string;
  studentName: string;
  classApplying: string;
  schoolingType: "Day Scholar" | "Residential";
  contactNumber: string;
  email: string;
  message?: string;
  status: "new" | "contacted" | "confirmed" | "rejected";
  createdAt?: string;
}

// ─── Contact Enquiry ──────────────────────────────────────────────────────────
export interface ContactEnquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: "Admissions" | "General" | "Facilities" | "Transport" | "Other";
  message: string;
  status: "new" | "read" | "replied";
  createdAt?: string;
}

// ─── Faculty ──────────────────────────────────────────────────────────────────
export interface FacultyMember {
  _id?: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  imageUrl?: string;
  bio?: string;
  order: number;
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────
export type GalleryCategory = "Campus" | "Classrooms" | "Sports" | "Events" | "Residential";

export interface GalleryItem {
  _id?: string;
  title: string;
  category: GalleryCategory;
  mediaType: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: string;
}

// ─── Admin User ───────────────────────────────────────────────────────────────
export interface AdminUser {
  _id?: string;
  email: string;
  name: string;
  role: "superadmin" | "editor";
}
// ─── Student User ─────────────────────────────────────────────────────────
export interface StudentUser {
  _id?: string;
  email: string;
  name: string;
  rollNumber: string;
  class: string;
  parentEmail?: string;
  phone?: string;
  role: "student";
}

// ─── Parent User ──────────────────────────────────────────────────────────
export interface ParentUser {
  _id?: string;
  email: string;
  name: string;
  phone: string;
  childrenNames?: string[];
  role: "parent";
}

// ─── Faculty User ────────────────────────────────────────────────────────
export interface FacultyUser {
  _id?: string;
  email: string;
  name: string;
  designation: string;
  role: "faculty";
}

// ─── Auth User Union ───────────────────────────────────────────────────────
export type AuthUser = AdminUser | StudentUser | ParentUser | FacultyUser;
// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}
