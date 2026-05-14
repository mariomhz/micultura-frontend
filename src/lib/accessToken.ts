const ACCESS_COOKIE = "mc_access";
const DEFAULT_MAX_AGE_SEC = 900;

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
  document.cookie = `${ACCESS_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax`;
}

export function clearAccessToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ACCESS_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
