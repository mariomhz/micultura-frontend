import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_COOKIE = "mc_access";

// Must match APP_JWT_SECRET used by the Spring Boot backend, byte for byte.
// Set JWT_SECRET in .env.local (never NEXT_PUBLIC_).
const rawSecret = process.env.JWT_SECRET;
if (!rawSecret && process.env.NODE_ENV === "production") {
  throw new Error(
    "JWT_SECRET is not set. Middleware cannot verify access tokens."
  );
}

const secret = rawSecret ? new TextEncoder().encode(rawSecret) : null;

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

  // Dev fallback when JWT_SECRET is unset: just check the cookie is there.
  // Backend will reject any bad token on the next API call anyway. Prod
  // still enforces signature verification because the secret is required.
  if (!secret) return NextResponse.next();

  try {
    const { payload } = await jwtVerify<{ rol?: string }>(token, secret);
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
