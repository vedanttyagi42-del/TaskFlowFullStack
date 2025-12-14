import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req) {
  const { username, display_name, email, password } = await req.json();

  const existing = await pool.query(
    "SELECT 1 FROM users WHERE email=$1",
    [email]
  );

  if (existing.rowCount > 0) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (username, display_name, email, password)
     VALUES ($1,$2,$3,$4)`,
    [username, display_name, email, hash]
  );

  const token = jwt.sign(
    { email, username },
    process.env.NEXT_PUBLIC_JWT_SECRET
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
