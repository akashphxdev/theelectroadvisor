// middleware.ts (root mein)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;
  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  // Login hai + /admin/login pe aaya → dashboard bhejo
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Login nahi + /admin/* pe aaya → login bhejo
  if (!isLoggedIn && isAdminPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};