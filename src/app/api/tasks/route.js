import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

function auth(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
}

export async function GET(req) {
  try {
    const user = auth(req);

    const tasks = await pool.query(
      "SELECT * FROM user_tasks WHERE username=$1 ORDER BY created_at DESC",
      [user.username]
    );

    return NextResponse.json(tasks.rows);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const user = auth(req);
    const { task_name } = await req.json();

    const result = await pool.query(
      `INSERT INTO user_tasks (task_name, username, completed, created_at)
       VALUES ($1,$2,false,NOW()) RETURNING *`,
      [task_name, user.username]
    );

    return NextResponse.json({ task: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
