import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard - Amet School",
  description: "Student dashboard for Amet School",
};

export default function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Welcome to Your Dashboard
        </h2>
        <p className="text-slate-600">
          Here you can view your academic information, assignments, and other
          important details.
        </p>
      </div>

      {/* Subjects Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Subjects</h3>
        <p className="text-sm opacity-90">View your enrolled subjects</p>
      </div>

      {/* Attendance Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Attendance</h3>
        <p className="text-sm opacity-90">Track your attendance records</p>
      </div>

      {/* Grades Card */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Grade Book</h3>
        <p className="text-sm opacity-90">Check your grades and results</p>
      </div>

      {/* Assignments Card */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Assignments</h3>
        <p className="text-sm opacity-90">
          View and submit your assignments
        </p>
      </div>

      {/* Announcements Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Announcements
        </h3>
        <p className="text-slate-600 text-sm">
          No new announcements at the moment
        </p>
      </div>
    </div>
  );
}
