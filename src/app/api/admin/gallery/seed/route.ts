import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/lib/db";
import GalleryItem from "@/database/models/GalleryItem";
import type { GalleryCategory } from "@/database/models/GalleryItem";

const GALLERY_ITEMS = [
  {
    title: "Campus Overview",
    category: "Campus" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1580829343991-c5377b42d1d5?w=500&h=500&fit=crop",
    description: "Beautiful aerial view of our sprawling campus",
  },
  {
    title: "Main Entrance",
    category: "Campus" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop",
    description: "Grand entrance gateway to AMET School",
  },
  {
    title: "Green Grounds",
    category: "Campus" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop",
    description: "Lush green open spaces on campus",
  },
  {
    title: "Walking Trails",
    category: "Campus" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=500&h=500&fit=crop",
    description: "Scenic walking paths around campus",
  },
  {
    title: "Smart Classroom",
    category: "Classrooms" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=500&h=500&fit=crop",
    description: "Modern interactive classroom with technology",
  },
  {
    title: "AI & Robotics Lab",
    category: "Classrooms" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=500&fit=crop",
    description: "Cutting-edge AI and robotics laboratory",
  },
  {
    title: "Central Library",
    category: "Classrooms" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop",
    description: "Well-stocked library with digital resources",
  },
  {
    title: "Science Lab",
    category: "Classrooms" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=500&fit=crop",
    description: "Equipped science laboratory for experiments",
  },
  {
    title: "Computer Lab",
    category: "Classrooms" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
    description: "Modern computer and programming lab",
  },
  {
    title: "Cricket Ground",
    category: "Sports" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1531415074968-36402844ee6f?w=500&h=500&fit=crop",
    description: "Professional cricket ground with practice nets",
  },
  {
    title: "Swimming Pool",
    category: "Sports" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1576610616656-570786412033?w=500&h=500&fit=crop",
    description: "Olympic-size swimming pool",
  },
  {
    title: "Basketball Court",
    category: "Sports" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1546519638-68711109d298?w=500&h=500&fit=crop",
    description: "Indoor basketball court with professional setup",
  },
  {
    title: "Tennis Courts",
    category: "Sports" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1554224311-beee415c15fc?w=500&h=500&fit=crop",
    description: "Multiple tennis courts for practice and tournaments",
  },
  {
    title: "Football Field",
    category: "Sports" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1551958219-acbc608c6c25?w=500&h=500&fit=crop",
    description: "Regulation-size football field",
  },
  {
    title: "Annual Day Celebration",
    category: "Events" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    description: "Spectacular annual day celebration event",
  },
  {
    title: "Cultural Program",
    category: "Events" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Students performing in cultural showcase",
  },
  {
    title: "Science Exhibition",
    category: "Events" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    description: "Annual science and innovation exhibition",
  },
  {
    title: "Sports Day",
    category: "Events" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop",
    description: "Inter-house sports day competition",
  },
  {
    title: "Graduation Ceremony",
    category: "Events" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1509909756405-057d4edcc1fd?w=500&h=500&fit=crop",
    description: "Graduation ceremony for graduating students",
  },
  {
    title: "Hostel Rooms",
    category: "Residential" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop",
    description: "Comfortable and spacious hostel rooms",
  },
  {
    title: "Dining Hall",
    category: "Residential" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1567572933382-74d440642117?w=500&h=500&fit=crop",
    description: "State-of-the-art dining facility",
  },
  {
    title: "Study Hall",
    category: "Residential" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1554995207-c18231b6ce48?w=500&h=500&fit=crop",
    description: "Quiet study areas for residents",
  },
  {
    title: "Recreation Room",
    category: "Residential" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    description: "Recreation and gaming room for students",
  },
  {
    title: "Common Area",
    category: "Residential" as GalleryCategory,
    mediaType: "image" as const,
    url: "https://images.unsplash.com/photo-1541123603104-852fc5d0b27e?w=500&h=500&fit=crop",
    description: "Common area for social gatherings",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const shouldSeed = body?.seed === true || body?.seed === "true";

    if (!shouldSeed) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    await connectDB();
    await GalleryItem.deleteMany({});

    const inserted = await GalleryItem.insertMany(GALLERY_ITEMS);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${inserted.length} gallery items`,
      count: inserted.length,
      data: inserted,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("Gallery seed error:", err);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
