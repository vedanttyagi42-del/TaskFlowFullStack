import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const result = await pool.query(
      "SELECT username, display_name, email FROM users WHERE email=$1",
      [decoded.email]
    );

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
