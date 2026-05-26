import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, type, platform, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Missing title or content" }, { status: 400 });
    }

    const db = readDB();
    const newProject = {
      id: Date.now().toString(),
      title,
      type: type || "Script",
      platform: platform || "YouTube",
      content,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    };

    db.projects.unshift(newProject);
    writeDB(db);

    return NextResponse.json({ success: true, data: newProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
