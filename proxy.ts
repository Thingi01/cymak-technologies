import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "cymak_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page and the login/logout API routes through untouched.
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next();
  }

  const isProtectedPage = pathname.startsWith("/admin");
  const isProtectedApi = pathname.startsWith("/api/admin");

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secretKey = getSecretKey();

  let valid = false;
  if (token && secretKey) {
    try {
      await jwtVerify(token, secretKey);
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};