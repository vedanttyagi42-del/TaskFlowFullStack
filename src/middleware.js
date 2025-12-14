import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/signup"];
const protectedRoutes = ["/dashboard", "/tasks"];

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // 🚨 DO NOT TOUCH API ROUTES
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/tasks/:path*",
    // ❌ DO NOT ADD /api HERE
  ],
};
