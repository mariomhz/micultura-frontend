// POST /api/auth/register
// POST /api/auth/login

import { api } from "@/lib/api";
import type { User } from "@/types";

export interface RegisterPayload {
  email: string;
  password: string;
  nombre: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>("/api/auth/register", payload).then((r) => r.data),

  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/api/auth/login", payload).then((r) => r.data),
};
