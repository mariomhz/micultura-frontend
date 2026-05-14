import { apiFetch } from "@/lib/api";

export interface MeResponse {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  createdAt: string;
}

export async function getMe(): Promise<MeResponse> {
  const response = await apiFetch("/api/users/me");
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return (await response.json()) as MeResponse;
}
