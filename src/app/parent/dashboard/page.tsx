import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Dashboard - Amet School",
  description: "Parent dashboard for monitoring child's progress",
};

export default function ParentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Parent Dashboard
        </h2>
        <p className="text-slate-600">
          Monitor your child's progress, attendance, and academic performance.
        </p>
      </div>

      {/* Child's Academic Progress */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Academic Progress</h3>
        <p className="text-sm opacity-90">View your child's performance</p>
      </div>

      {/* Attendance Report */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Attendance Report</h3>
        <p className="text-sm opacity-90">Check attendance records</p>
      </div>

      {/* Communication */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Teacher Communication</h3>
        <p className="text-sm opacity-90">Messages from teachers</p>
      </div>

      {/* School Events */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <p className="text-sm opacity-90">Important school announcements</p>
      </div>

      {/* Fees & Payments */}
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Fees & Payments
        </h3>
        <p className="text-slate-600 text-sm">View fee status and payments</p>
      </div>
    </div>
  );
}
