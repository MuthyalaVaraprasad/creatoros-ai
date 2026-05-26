import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = readDB();
    const userExists = db.users.find((u) => u.email === email);

    if (userExists) {
      return NextResponse.json(
        { success: false, error: "User already exists with this email" },
        { status: 400 }
      );
    }

    db.users.push({ email, password, name });
    writeDB(db);

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please proceed with verification OTP."
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error occurred" },
      { status: 500 }
    );
  }
}
