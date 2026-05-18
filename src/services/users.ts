import { apiFetch } from "@/lib/api";
import type { Event } from "@/types";

export interface MeResponse {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  createdAt: string;
}

export interface UpdateProfilePayload {
  nombre?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

interface ErrorBody {
  error?: string;
  message?: string;
  fields?: Record<string, string>;
}

async function readError(response: Response): Promise<string> {
  let body: ErrorBody = {};
  try {
    body = (await response.json()) as ErrorBody;
  } catch {
    /* non-JSON */
  }
  if (body.fields) {
    const first = Object.values(body.fields)[0];
    if (first) return first;
  }
  return body.error || body.message || `Error ${response.status}`;
}

export async function getMe(): Promise<MeResponse> {
  const response = await apiFetch("/api/users/me");
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as MeResponse;
}

export async function updateMe(payload: UpdateProfilePayload): Promise<MeResponse> {
  const response = await apiFetch("/api/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as MeResponse;
}

// ── Saved events ─────────────────────────────────────────────────────────

export async function listSavedEvents(): Promise<Event[]> {
  const response = await apiFetch("/api/users/me/saved");
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as Event[];
}

export async function isEventSaved(eventoId: number): Promise<boolean> {
  const response = await apiFetch(`/api/users/me/saved/${eventoId}`);
  if (!response.ok) {
    if (response.status === 401) return false;
    throw new Error(await readError(response));
  }
  const body = (await response.json()) as { saved: boolean };
  return body.saved;
}

export async function saveEvent(eventoId: number): Promise<void> {
  const response = await apiFetch(`/api/users/me/saved/${eventoId}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function unsaveEvent(eventoId: number): Promise<void> {
  const response = await apiFetch(`/api/users/me/saved/${eventoId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(await readError(response));
}
