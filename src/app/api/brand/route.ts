import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.brandKit });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { colorPrimary, colorSecondary, font, voice } = await req.json();

    const db = readDB();
    db.brandKit = {
      colorPrimary: colorPrimary || db.brandKit.colorPrimary,
      colorSecondary: colorSecondary || db.brandKit.colorSecondary,
      font: font || db.brandKit.font,
      voice: voice || db.brandKit.voice
    };

    writeDB(db);

    return NextResponse.json({ success: true, data: db.brandKit });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
