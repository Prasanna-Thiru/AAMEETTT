import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFacultyMember extends Document {
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  imageUrl?: string;
  bio?: string;
  order: number;
}

const FacultySchema = new Schema<IFacultyMember>(
  {
    name:          { type: String, required: true, trim: true },
    designation:   { type: String, required: true, trim: true },
    subject:       { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    experience:    { type: String, required: true, trim: true },
    imageUrl:      { type: String, default: "" },
    bio:           { type: String, trim: true },
    order:         { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Faculty: Model<IFacultyMember> =
  mongoose.models.Faculty ||
  mongoose.model<IFacultyMember>("Faculty", FacultySchema);

export default Faculty;
