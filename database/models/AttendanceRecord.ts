import mongoose, { Document, Model, Schema } from "mongoose";

export type AttendanceStatus = "present" | "absent" | "late";

export interface IAttendanceRecord extends Document {
  studentId: mongoose.Types.ObjectId;
  className: string;
  date: string;
  subject: string;
  status: AttendanceStatus;
  markedBy: mongoose.Types.ObjectId;
  markedByName: string;
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    className: { type: String, required: true, trim: true, index: true },
    date: { type: String, required: true, trim: true, index: true },
    subject: { type: String, required: true, trim: true },
    status: { type: String, enum: ["present", "absent", "late"], required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: "FacultyLogin", required: true },
    markedByName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

AttendanceRecordSchema.index({ studentId: 1, date: 1, subject: 1 }, { unique: true });

const AttendanceRecord: Model<IAttendanceRecord> =
  mongoose.models.AttendanceRecord ||
  mongoose.model<IAttendanceRecord>("AttendanceRecord", AttendanceRecordSchema);

export default AttendanceRecord;
