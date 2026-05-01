import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IFacultyLogin extends Document {
  email: string;
  password: string;
  facultyId: mongoose.Types.ObjectId;
  name: string;
  designation: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const FacultyLoginSchema = new Schema<IFacultyLogin>(
  {
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:    { type: String, required: true, minlength: 8 },
    facultyId:   { type: Schema.Types.ObjectId, ref: "Faculty", required: true },
    name:        { type: String, required: true, trim: true },
    designation: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before save
FacultyLoginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

FacultyLoginSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const FacultyLogin: Model<IFacultyLogin> =
  mongoose.models.FacultyLogin ||
  mongoose.model<IFacultyLogin>("FacultyLogin", FacultyLoginSchema);

export default FacultyLogin;
