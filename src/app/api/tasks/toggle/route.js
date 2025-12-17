import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

function auth(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
}

export async function POST(req) {
  try {
    const user = auth(req);
    const { id } = await req.json();

    const result = await pool.query(
      `UPDATE user_tasks
       SET completed = NOT completed
       WHERE id = $1
       AND TRIM(LOWER(username)) = TRIM(LOWER($2))
       RETURNING *`,
      [id, user.username]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
