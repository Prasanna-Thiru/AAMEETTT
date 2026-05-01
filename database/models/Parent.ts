import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IParent extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  childrenNames?: string[];
  comparePassword(candidate: string): Promise<boolean>;
}

const ParentSchema = new Schema<IParent>(
  {
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:     { type: String, required: true, minlength: 8 },
    name:         { type: String, required: true, trim: true },
    phone:        { type: String, required: true },
    childrenNames: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Hash password before save
ParentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

ParentSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const Parent: Model<IParent> =
  mongoose.models.Parent ||
  mongoose.model<IParent>("Parent", ParentSchema);

export default Parent;
