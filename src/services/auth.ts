const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string>;
}

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface BackendAuthResponse {
  token: string;
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface BackendErrorBody {
  message?: string;
  errors?: Record<string, string>;
}

function normalize(payload: BackendAuthResponse): AuthResponse {
  return {
    token: payload.token,
    user: {
      id: payload.id,
      nombre: payload.nombre,
      email: payload.email,
      rol: payload.rol,
    },
  };
}

async function toAuthError(response: Response): Promise<AuthError> {
  let body: BackendErrorBody = {};
  try {
    body = (await response.json()) as BackendErrorBody;
  } catch {
    // non-JSON; keep empty body
  }
  return {
    message: body.message || `Error ${response.status}`,
    errors: body.errors,
  };
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await toAuthError(response);
  const data = (await response.json()) as BackendAuthResponse;
  return normalize(data);
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw await toAuthError(response);
  const data = (await response.json()) as BackendAuthResponse;
  return normalize(data);
}

export async function refresh(): Promise<AuthResponse | null> {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) return null;
  const data = (await response.json()) as BackendAuthResponse;
  return normalize(data);
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).catch(() => {
    // best-effort; cookie will still be cleared client-side
  });
}
