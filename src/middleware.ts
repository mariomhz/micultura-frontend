import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

const ACCESS_COOKIE = "mc_access";

// Must match APP_JWT_SECRET used by the Spring Boot backend, byte for byte.
// Set JWT_SECRET in .env.local (never NEXT_PUBLIC_).
const rawSecret = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV === "production";

if (!rawSecret && isProd) {
  throw new Error(
    "JWT_SECRET is not set. Middleware cannot verify access tokens."
  );
}
if (!rawSecret) {
  console.warn(
    "[middleware] JWT_SECRET is not set — running in permissive dev mode " +
      "(presence + expiry only, no signature check). Set JWT_SECRET in " +
      ".env.local for full verification."
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

  try {
    let payload: { rol?: string; exp?: number };

    if (secret) {
      // Production / configured dev: full signature + expiry verification.
      const verified = await jwtVerify<{ rol?: string }>(token, secret);
      payload = verified.payload;
    } else {
      // Dev fallback: signature not checked, but expiry still enforced.
      // Bad tokens get caught by the backend on the next API call anyway.
      payload = decodeJwt<{ rol?: string }>(token);
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return redirectToLogin(request);
      }
    }

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
