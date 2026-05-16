import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_COOKIE = "mc_access";

// Must match the JWT_SECRET used by the Spring Boot backend.
// Set JWT_SECRET in .env.local (never NEXT_PUBLIC_).
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "changeme"
);

function redirectToLogin(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const next = url.pathname + (url.search || "");
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(next)}`;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return redirectToLogin(request);

  try {
    // Verifies signature + expiry. Throws on any failure.
    const { payload } = await jwtVerify<{ rol?: string }>(token, secret);

    // Guard admin routes — add "/admin/:path*" to the matcher below
    // once the admin pages are created.
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      payload.rol !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // Invalid signature, expired token, or malformed JWT → force re-login
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  // "/admin/:path*" intentionally omitted — no admin pages exist yet.
  // Add it back here (and wire the role guard above) when they are created.
  matcher: ["/profile/:path*"],
};
