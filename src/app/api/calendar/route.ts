import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.calendar });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, platform, date, color } = await req.json();
    if (!title || !date) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const db = readDB();
    const newEvent = {
      id: Date.now().toString(),
      title,
      platform: platform || "YouTube",
      date: Number(date),
      color: color || "bg-red-500/20 text-red-400 border-red-500/30"
    };

    db.calendar.push(newEvent);
    writeDB(db);

    return NextResponse.json({ success: true, data: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
