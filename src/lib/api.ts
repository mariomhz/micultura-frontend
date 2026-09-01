import { getAccessToken, setAccessToken, clearAccessToken } from "@/lib/accessToken";
import { refresh as refreshAuth } from "@/services/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Free-tier hosting sleeps and can take a minute to wake. Read requests give up
// well before that so callers can fall back instead of leaving a blank screen.
const READ_TIMEOUT_MS = 8000;

export async function apiFetchWithTimeout(
  path: string,
  options: RequestInit = {},
  timeoutMs: number = READ_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await apiFetch(path, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

let refreshing: Promise<string | null> | null = null;

function getOrStartRefresh(): Promise<string | null> {
  if (refreshing) return refreshing;
  refreshing = refreshAuth()
    .then((res) => {
      if (!res) return null;
      setAccessToken(res.token);
      return res.token;
    })
    .catch(() => null)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

function buildHeaders(token: string | null, init?: RequestInit): Headers {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getAccessToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(token, options),
  });

  const isAuthPath = path.startsWith("/api/auth/");
  if (response.status !== 401 || isAuthPath) {
    return response;
  }

  const newToken = await getOrStartRefresh();
  if (!newToken) {
    clearAccessToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return response;
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: buildHeaders(newToken, options),
  });
}
