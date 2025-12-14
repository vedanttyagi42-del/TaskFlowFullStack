import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

export async function POST(req) {
  const { email, password } = await req.json();

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 LIMIT 1",
    [email]
  );

  if (result.rowCount === 0)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });

  const token = jwt.sign(
    { email: user.email, username: user.username },
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
