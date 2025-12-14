import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

/* 🔐 Auth helper */
function auth(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
}

/* ✅ TOGGLE COMPLETE */
export async function PATCH(req, { params }) {
  try {
    const user = auth(req);
    const { id } = params;

    const result = await pool.query(
      `UPDATE user_tasks
       SET completed = NOT completed
       WHERE id = $1 AND username = $2
       RETURNING *`,
      [id, user.username]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ task: result.rows[0] });
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

/* 🗑️ DELETE TASK */
export async function DELETE(req, { params }) {
  try {
    const user = auth(req);
    const { id } = params;

    const result = await pool.query(
      `DELETE FROM user_tasks
       WHERE id = $1 AND username = $2
       RETURNING *`,
      [id, user.username]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      task: result.rows[0],
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
