"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaSpinner, FaTrash, FaUserPlus, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type Role = "student" | "parent" | "faculty";

type StudentAccess = {
  id: string;
  email: string;
  note: string;
  usedAt: string | null;
  createdAt: string;
  student: {
    name: string;
    rollNumber: string;
    class: string;
  } | null;
};

export default function CreateUserPage() {
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [accessMessage, setAccessMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [studentAccessList, setStudentAccessList] = useState<StudentAccess[]>([]);
  const [accessForm, setAccessForm] = useState({ email: "", note: "" });

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

  const loadStudentAccess = async () => {
    try {
      const res = await axios.get("/api/admin/student-access");
      setStudentAccessList(res.data.data || []);
    } catch (err: any) {
      setAccessMessage({ type: "error", text: err.response?.data?.error || "Unable to load approved student emails." });
    }
  };

  useEffect(() => {
    loadStudentAccess();
  }, []);

  const handleAccessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStudentAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccessMessage(null);
    setAccessLoading(true);

    try {
      await axios.post("/api/admin/student-access", accessForm);
      setAccessMessage({ type: "success", text: "Student email approved for portal login." });
      setAccessForm({ email: "", note: "" });
      await loadStudentAccess();
    } catch (err: any) {
      setAccessMessage({ type: "error", text: err.response?.data?.error || "Unable to approve student email." });
    } finally {
      setAccessLoading(false);
    }
  };

  const handleRemoveStudentAccess = async (email: string) => {
    setAccessMessage(null);
    setAccessLoading(true);

    try {
      await axios.delete(`/api/admin/student-access?email=${encodeURIComponent(email)}`);
      setAccessMessage({ type: "success", text: "Student email removed from the approved list." });
      await loadStudentAccess();
    } catch (err: any) {
      setAccessMessage({ type: "error", text: err.response?.data?.error || "Unable to remove student email." });
    } finally {
      setAccessLoading(false);
    }
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
      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-brand-green to-brand-blue p-6 text-white">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-2xl" />
            <h2 className="font-serif text-2xl font-bold">Student Login Access</h2>
          </div>
          <p className="mt-2 text-sm text-blue-50">
            Approve student email addresses before they can use Google login or access the student portal.
          </p>
        </div>

        <div className="p-6">
          {accessMessage && (
            <div className={`mb-5 flex items-center gap-3 rounded-xl border p-4 ${accessMessage.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              {accessMessage.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
              {accessMessage.text}
            </div>
          )}

          <form onSubmit={handleAddStudentAccess} className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Student Email</label>
              <input
                required
                type="email"
                name="email"
                value={accessForm.email}
                onChange={handleAccessChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={accessForm.note}
                onChange={handleAccessChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Optional class, batch, or remark"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={accessLoading} className="btn-primary w-full md:w-auto">
                {accessLoading ? <><FaSpinner className="mr-2 animate-spin" /> Saving...</> : "Approve Email"}
              </button>
            </div>
          </form>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
            <div className="grid grid-cols-[1fr_auto] bg-gray-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
              <span>Approved student emails</span>
              <span>Status</span>
            </div>

            {studentAccessList.length === 0 ? (
              <div className="px-4 py-5 text-sm text-gray-500">No student emails approved yet.</div>
            ) : (
              studentAccessList.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-gray-100 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{item.email}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.student
                        ? `${item.student.name} · ${item.student.rollNumber} · ${item.student.class}`
                        : item.note || "Waiting for admin-created student account"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.student ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                      {item.student ? "Account active" : "Approved"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStudentAccess(item.email)}
                      disabled={accessLoading}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      aria-label={`Remove ${item.email}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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
