"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPaperPlane, FaSpinner } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

const ENQUIRY_TYPES = ["Admissions", "General", "Facilities", "Transport", "Other"];

interface ContactFormProps {
  locationLabel?: string;
  locationUrl?: string;
}

export default function ContactForm({ locationLabel, locationUrl }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post("/api/contact", data);
      toast.success("Message sent! We'll respond within 24 hours.");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-5">We'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {locationLabel && locationUrl && (
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-brand-gold/20 bg-brand-cream p-4 transition-colors hover:border-brand-green/30 hover:bg-brand-green/5"
        >
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <FaMapMarkerAlt className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue-light">Visit Campus</p>
            <p className="mt-1 text-sm font-semibold text-brand-dark">{locationLabel}</p>
            <p className="mt-1 text-xs text-gray-500">Open this exact location in Google Maps</p>
          </div>
        </a>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Your Name *</label>
          <input {...register("name", { required: "Name is required" })} className={`input-field ${errors.name ? "border-red-400" : ""}`} placeholder="Full name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Phone Number *</label>
          <input
            {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" } })}
            className={`input-field ${errors.phone ? "border-red-400" : ""}`}
            placeholder="10-digit mobile number"
            type="tel"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Email Address *</label>
        <input
          {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" } })}
          className={`input-field ${errors.email ? "border-red-400" : ""}`}
          placeholder="your@email.com"
          type="email"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label">Enquiry Type *</label>
        <select {...register("enquiryType", { required: "Please select enquiry type" })} className={`input-field ${errors.enquiryType ? "border-red-400" : ""}`}>
          <option value="">Select Enquiry Type</option>
          {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        {errors.enquiryType && <p className="text-red-500 text-xs mt-1">{errors.enquiryType.message}</p>}
      </div>

      <div>
        <label className="label">Message *</label>
        <textarea
          {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })}
          className={`input-field resize-none ${errors.message ? "border-red-400" : ""}`}
          rows={5}
          placeholder="Write your message here..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
        {loading ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaPaperPlane /> Send Message</>}
      </button>
    </form>
  );
}
