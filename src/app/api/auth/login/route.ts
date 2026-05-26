import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = readDB();
    const user = db.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        email: user.email,
        name: user.name,
        isLoggedIn: true
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server login error occurred" },
      { status: 500 }
    );
  }
}
