import { FaChalkboardUser, FaGraduationCap } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

export type UserRole = "student" | "parent" | "faculty";
export type AuthMode = "login" | "signup" | "forgot" | "reset";

export const AUTH_REDIRECTS: Record<UserRole, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  faculty: "/faculty/dashboard",
};

export const ROLE_OPTIONS: {
  id: UserRole;
  label: string;
  icon: typeof FaGraduationCap;
  eyebrow: string;
  description: string;
  accent: string;
  softAccent: string;
}[] = [
  {
    id: "student",
    label: "Student",
    icon: FaGraduationCap,
    eyebrow: "Academic Dashboard",
    description: "Check attendance, assignments, marks, and circulars in one secure space.",
    accent: "#0f61e5",
    softAccent: "#dbeafe",
  },
  {
    id: "parent",
    label: "Parent",
    icon: FaUsers,
    eyebrow: "Family Access",
    description: "Track your child's progress, notices, fee updates, and school communication.",
    accent: "#0284c7",
    softAccent: "#dff4ff",
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: FaChalkboardUser,
    eyebrow: "Teaching Console",
    description: "Manage classes, records, announcements, and day-to-day academic workflow.",
    accent: "#1d4ed8",
    softAccent: "#dde7ff",
  },
];
