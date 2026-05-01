import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Public signup is disabled. Please contact the school admin for portal login credentials.",
    },
    { status: 403 }
  );
}
