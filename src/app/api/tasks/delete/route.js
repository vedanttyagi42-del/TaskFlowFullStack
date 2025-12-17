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
      `DELETE FROM user_tasks
       WHERE id = $1
       AND TRIM(LOWER(username)) = TRIM(LOWER($2))
       RETURNING *`,
      [id, user.username]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
