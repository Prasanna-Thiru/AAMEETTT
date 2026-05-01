"use client";
import { useState } from "react";
import axios from "axios";
import { FaUserPlus, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type Role = "student" | "parent" | "faculty";

export default function CreateUserPage() {
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    className: "",
    parentEmail: "",
    phone: "",
    childrenNames: "",
    designation: "",
    subject: "",
    qualification: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const payload: any = { role, name: formData.name, email: formData.email, password: formData.password };
      if (role === "student") {
        payload.rollNumber = formData.rollNumber;
        payload.className = formData.className;
        payload.parentEmail = formData.parentEmail;
        payload.phone = formData.phone;
      } else if (role === "parent") {
        payload.phone = formData.phone;
        payload.childrenNames = formData.childrenNames;
      } else if (role === "faculty") {
        payload.designation = formData.designation;
        payload.subject = formData.subject;
        payload.qualification = formData.qualification;
        payload.experience = formData.experience;
      }

      const res = await axios.post("/api/admin/users", payload);
      setMessage({ type: "success", text: `User created successfully for ${res.data.data.name} as ${role}!` });
      setFormData({
        name: "", email: "", password: "", rollNumber: "", className: "",
        parentEmail: "", phone: "", childrenNames: "", designation: "", subject: "", qualification: "", experience: ""
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.error || "Error creating user." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-dark to-brand-blue p-6 text-white">
          <div className="flex items-center gap-3">
            <FaUserPlus className="text-2xl" />
            <h2 className="font-serif text-2xl font-bold">Create New User</h2>
          </div>
          <p className="mt-2 text-sm text-blue-100">
            Generate login credentials for students, parents, and faculty. Once created, you can securely share the ID and password with them.
          </p>
        </div>

        <div className="p-6">
          {message && (
            <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">User Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. John Doe" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Login Email <span className="text-red-500">*</span></label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="student@example.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Temporary Password <span className="text-red-500">*</span></label>
                <input required type="text" name="password" minLength={8} value={formData.password} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="Min 8 characters" />
              </div>

              {role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number <span className="text-red-500">*</span></label>
                    <input required type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. 2026-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class <span className="text-red-500">*</span></label>
                    <input required type="text" name="className" value={formData.className} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. Grade 7" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Email (Optional)</label>
                    <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="parent@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="1234567890" />
                  </div>
                </>
              )}

              {role === "parent" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="Mobile Number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Children Names (Comma separated)</label>
                    <input type="text" name="childrenNames" value={formData.childrenNames} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. Ali, Sarah" />
                  </div>
                </>
              )}

              {role === "faculty" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Designation <span className="text-red-500">*</span></label>
                    <input required type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. Senior Teacher" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. Mathematics" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification <span className="text-red-500">*</span></label>
                    <input required type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. M.Sc, B.Ed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience <span className="text-red-500">*</span></label>
                    <input required type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" placeholder="E.g. 5 Years" />
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? <><FaSpinner className="animate-spin mr-2" /> Creating...</> : "Create User Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
