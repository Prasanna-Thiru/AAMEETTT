"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import type { AdmissionLead } from "@/frontend/types";

type FormData = Omit<AdmissionLead, "_id" | "status" | "createdAt">;

const CLASSES = ["LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7"];

export default function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post("/api/admissions", data);
      toast.success("Application submitted! We'll contact you within 24 hours.");
      setSubmitted(true);
      reset();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Application Received!</h3>
        <p className="text-gray-500 text-sm mb-6">Our admissions team will contact you within 24–48 hours.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Parent Name */}
        <div>
          <label className="label">Parent / Guardian Name *</label>
          <input
            {...register("parentName", { required: "Parent name is required" })}
            className={`input-field ${errors.parentName ? "border-red-400 focus:ring-red-400" : ""}`}
            placeholder="Full name"
          />
          {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>}
        </div>

        {/* Student Name */}
        <div>
          <label className="label">Student Name *</label>
          <input
            {...register("studentName", { required: "Student name is required" })}
            className={`input-field ${errors.studentName ? "border-red-400 focus:ring-red-400" : ""}`}
            placeholder="Student's full name"
          />
          {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>}
        </div>

        {/* Class */}
        <div>
          <label className="label">Class Applying For *</label>
          <select
            {...register("classApplying", { required: "Please select a class" })}
            className={`input-field ${errors.classApplying ? "border-red-400" : ""}`}
          >
            <option value="">Select Class</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.classApplying && <p className="text-red-500 text-xs mt-1">{errors.classApplying.message}</p>}
        </div>

        {/* Schooling Type */}
        <div>
          <label className="label">Schooling Type *</label>
          <select
            {...register("schoolingType", { required: "Please select schooling type" })}
            className={`input-field ${errors.schoolingType ? "border-red-400" : ""}`}
          >
            <option value="">Select Type</option>
            <option>Day Scholar</option>
            <option>Residential</option>
          </select>
          {errors.schoolingType && <p className="text-red-500 text-xs mt-1">{errors.schoolingType.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Contact Number *</label>
          <input
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
            })}
            className={`input-field ${errors.contactNumber ? "border-red-400" : ""}`}
            placeholder="10-digit mobile number"
            type="tel"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email Address *</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
            })}
            className={`input-field ${errors.email ? "border-red-400" : ""}`}
            placeholder="your@email.com"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="label">Additional Message (Optional)</label>
        <textarea
          {...register("message")}
          className="input-field resize-none"
          rows={3}
          placeholder="Any specific questions or requirements..."
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
        {loading ? (
          <><FaSpinner className="animate-spin" /> Submitting...</>
        ) : (
          <>Submit Application <FaArrowRight /></>
        )}
      </button>
    </form>
  );
}
