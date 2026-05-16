const ACCESS_COOKIE = "mc_access";
const DEFAULT_MAX_AGE_SEC = 900;

/**
 * The Secure flag is required by browsers for any cookie sent over HTTPS in
 * production. We can't add it unconditionally because Secure cookies are
 * rejected on plain http://localhost during development.
 */
function isSecureContext(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.protocol === "https:";
}

function cookieAttributes(maxAgeSec: number): string {
  const secure = isSecureContext() ? "; Secure" : "";
  return `Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secure}`;
}

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${ACCESS_COOKIE}=`;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix));
  if (!match) return null;
  const value = match.slice(prefix.length);
  return value ? decodeURIComponent(value) : null;
}

export function setAccessToken(token: string, maxAgeSec: number = DEFAULT_MAX_AGE_SEC): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ACCESS_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes(maxAgeSec)}`;
}

export function clearAccessToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ACCESS_COOKIE}=; ${cookieAttributes(0)}`;
}
