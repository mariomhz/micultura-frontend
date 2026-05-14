// GET    /api/events
// GET    /api/events/{id}
// GET    /api/events?category={id}
// POST   /api/events          (admin)
// PUT    /api/events/{id}     (admin)
// DELETE /api/events/{id}     (admin)

import { apiFetch } from "@/lib/api";
import type { Event } from "@/types";

export type CreateEventPayload = Omit<Event, "id" | "categoria">;
export type UpdateEventPayload = Partial<CreateEventPayload>;

async function jsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}

export const eventsService = {
  getAll: async (categoryId?: number): Promise<Event[]> => {
    const path =
      categoryId != null ? `/api/events?category=${categoryId}` : "/api/events";
    return jsonOrThrow<Event[]>(await apiFetch(path));
  },

  getById: async (id: number): Promise<Event> =>
    jsonOrThrow<Event>(await apiFetch(`/api/events/${id}`)),

  create: async (payload: CreateEventPayload): Promise<Event> =>
    jsonOrThrow<Event>(
      await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(payload),
      })
    ),

  update: async (id: number, payload: UpdateEventPayload): Promise<Event> =>
    jsonOrThrow<Event>(
      await apiFetch(`/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
    ),

  remove: async (id: number): Promise<void> => {
    const response = await apiFetch(`/api/events/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  },
};
