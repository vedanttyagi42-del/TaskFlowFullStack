import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out" }
  );

  // Clear JWT cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,          // must match how it was set
    sameSite: "none",      // must match
    path: "/",             // VERY IMPORTANT
    maxAge: 0,
  });

  return response;
}
