import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentAccess extends Document {
  email: string;
  note?: string;
  createdBy?: string;
  createdByEmail?: string;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentAccessSchema = new Schema<IStudentAccess>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    note: { type: String, trim: true },
    createdBy: { type: String },
    createdByEmail: { type: String, lowercase: true, trim: true },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

const StudentAccess: Model<IStudentAccess> =
  mongoose.models.StudentAccess ||
  mongoose.model<IStudentAccess>("StudentAccess", StudentAccessSchema);

export default StudentAccess;
