export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nombre: string;
    email: string;
    rol: string;
  };
}

export interface AuthError {
  message: string;
  field?: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await delay(800);

  if (payload.email === "test@test.com") {
    const error: AuthError = {
      message: "Ya existe una cuenta con este email",
      field: "email",
    };
    throw error;
  }

  return {
    token: "mock-jwt-token-register",
    user: {
      id: "mock-uuid-001",
      nombre: payload.nombre,
      email: payload.email,
      rol: "USER",
    },
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await delay(800);

  if (payload.password !== "password123") {
    const error: AuthError = {
      message: "Credenciales inválidas",
    };
    throw error;
  }

  const fakePayload = btoa(
    JSON.stringify({
      sub: payload.email,
      id: "mock-uuid-001",
      nombre: "Usuario Mock",
      rol: "USER",
    })
  );

  return {
    token: `eyHeader.${fakePayload}.eySignature`,
    user: {
      id: "mock-uuid-001",
      nombre: "Usuario Mock",
      email: payload.email,
      rol: "USER",
    },
  };
}
