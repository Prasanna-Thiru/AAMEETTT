import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  enquiryType: "Admissions" | "General" | "Facilities" | "Transport" | "Other";
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, trim: true, lowercase: true },
    phone:       { type: String, required: true, trim: true },
    enquiryType: { type: String, enum: ["Admissions", "General", "Facilities", "Transport", "Other"], required: true },
    message:     { type: String, required: true, trim: true },
    status:      { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

const ContactEnquiry: Model<IContactEnquiry> =
  mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>("ContactEnquiry", ContactEnquirySchema);

export default ContactEnquiry;
