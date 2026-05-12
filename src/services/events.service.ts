// GET    /api/events
// GET    /api/events/{id}
// GET    /api/events?category={id}
// POST   /api/events          (admin)
// PUT    /api/events/{id}     (admin)
// DELETE /api/events/{id}     (admin)

import { api } from "@/lib/api";
import type { Event } from "@/types";

export type CreateEventPayload = Omit<Event, "id" | "categoria">;
export type UpdateEventPayload = Partial<CreateEventPayload>;

export const eventsService = {
  getAll: (categoryId?: number) =>
    api
      .get<Event[]>("/api/events", {
        params: categoryId ? { category: categoryId } : undefined,
      })
      .then((r) => r.data),

  getById: (id: number) =>
    api.get<Event>(`/api/events/${id}`).then((r) => r.data),

  create: (payload: CreateEventPayload) =>
    api.post<Event>("/api/events", payload).then((r) => r.data),

  update: (id: number, payload: UpdateEventPayload) =>
    api.put<Event>(`/api/events/${id}`, payload).then((r) => r.data),

  remove: (id: number) =>
    api.delete<void>(`/api/events/${id}`).then((r) => r.data),
};
