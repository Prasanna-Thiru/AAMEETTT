import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Dashboard - Amet School",
  description: "Faculty dashboard for managing classes and grades",
};

export default function FacultyDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Faculty Dashboard
        </h2>
        <p className="text-slate-600">
          Manage your classes, students, grades, and academic activities.
        </p>
      </div>

      {/* My Classes */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">My Classes</h3>
        <p className="text-sm opacity-90">Manage your assigned classes</p>
      </div>

      {/* Grade Management */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Grade Management</h3>
        <p className="text-sm opacity-90">Enter and manage student grades</p>
      </div>

      {/* Attendance */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Attendance</h3>
        <p className="text-sm opacity-90">Mark and view attendance</p>
      </div>

      {/* Assignments */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Assignments</h3>
        <p className="text-sm opacity-90">Create and review assignments</p>
      </div>

      {/* Communication */}
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Parent Communication
        </h3>
        <p className="text-slate-600 text-sm">Send messages to parents</p>
      </div>
    </div>
  );
}
