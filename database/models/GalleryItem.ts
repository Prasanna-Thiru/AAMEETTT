import mongoose, { Schema, Document, Model } from "mongoose";

export type GalleryCategory = "Campus" | "Classrooms" | "Sports" | "Events" | "Residential";

export interface IGalleryItem extends Document {
  title: string;
  category: GalleryCategory;
  mediaType: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title:        { type: String, required: true, trim: true },
    category:     { type: String, enum: ["Campus", "Classrooms", "Sports", "Events", "Residential"], required: true },
    mediaType:    { type: String, enum: ["image", "video"], required: true },
    url:          { type: String, required: true },
    thumbnailUrl: { type: String },
    description:  { type: String, trim: true },
  },
  { timestamps: true }
);

const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GallerySchema);

export default GalleryItem;
