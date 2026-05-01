import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmissionLead extends Document {
  parentName: string;
  studentName: string;
  classApplying: string;
  schoolingType: "Day Scholar" | "Residential";
  contactNumber: string;
  email: string;
  message?: string;
  status: "new" | "contacted" | "confirmed" | "rejected";
  createdAt: Date;
}

const AdmissionLeadSchema = new Schema<IAdmissionLead>(
  {
    parentName:    { type: String, required: true, trim: true },
    studentName:   { type: String, required: true, trim: true },
    classApplying: { type: String, required: true },
    schoolingType: { type: String, enum: ["Day Scholar", "Residential"], required: true },
    contactNumber: { type: String, required: true, trim: true },
    email:         { type: String, required: true, trim: true, lowercase: true },
    message:       { type: String, trim: true },
    status:        { type: String, enum: ["new", "contacted", "confirmed", "rejected"], default: "new" },
  },
  { timestamps: true }
);

const AdmissionLead: Model<IAdmissionLead> =
  mongoose.models.AdmissionLead ||
  mongoose.model<IAdmissionLead>("AdmissionLead", AdmissionLeadSchema);

export default AdmissionLead;
