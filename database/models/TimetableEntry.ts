import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITimetableEntry extends Document {
  className: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room?: string;
  note?: string;
}

const TimetableEntrySchema = new Schema<ITimetableEntry>(
  {
    className: { type: String, required: true, trim: true, index: true },
    day: { type: String, required: true, trim: true, index: true },
    startTime: { type: String, required: true, trim: true },
    endTime: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    teacherName: { type: String, required: true, trim: true },
    room: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

TimetableEntrySchema.index({ className: 1, day: 1, startTime: 1 });

const TimetableEntry: Model<ITimetableEntry> =
  mongoose.models.TimetableEntry ||
  mongoose.model<ITimetableEntry>("TimetableEntry", TimetableEntrySchema);

export default TimetableEntry;
