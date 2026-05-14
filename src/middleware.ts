import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "mc_access";

interface JwtPayload {
  exp?: number;
  rol?: string;
}

function decodePayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "===".slice((b64.length + 3) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const next = url.pathname + (url.search || "");
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(next)}`;
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  const payload = token ? decodePayload(token) : null;

  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
    return redirectToLogin(request);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && payload.rol !== "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
