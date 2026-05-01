import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IStudent extends Document {
  email: string;
  password: string;
  name: string;
  rollNumber: string;
  class: string;
  parentEmail?: string;
  phone?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const StudentSchema = new Schema<IStudent>(
  {
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:    { type: String, required: true, minlength: 8 },
    name:        { type: String, required: true, trim: true },
    rollNumber:  { type: String, required: true, unique: true },
    class:       { type: String, required: true },
    parentEmail: { type: String, lowercase: true, trim: true },
    phone:       { type: String },
  },
  { timestamps: true }
);

// Hash password before save
StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

StudentSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const Student: Model<IStudent> =
  mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
