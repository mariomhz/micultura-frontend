// GET    /api/events
// GET    /api/events/{id}
// GET    /api/events?category={id}&search=...&fechaDesde=...&fechaHasta=...&precioMin=...&precioMax=...
// POST   /api/events          (admin)
// PUT    /api/events/{id}     (admin)
// DELETE /api/events/{id}     (admin)

import { apiFetch } from "@/lib/api";
import type { Event, PaginatedResponse } from "@/types";

export type CreateEventPayload = Omit<Event, "id" | "categoria">;
export type UpdateEventPayload = Partial<CreateEventPayload>;

export interface GetAllParams {
  categoryId?: number | null;
  search?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  precioMin?: number;
  precioMax?: number;
}

async function jsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}

export const eventsService = {
  getAll: async (params: GetAllParams = {}): Promise<PaginatedResponse<Event>> => {
    const { categoryId, search, fechaDesde, fechaHasta, precioMin, precioMax } = params;
    const qs = new URLSearchParams();
    if (categoryId != null)  qs.set("category",   String(categoryId));
    if (search?.trim())      qs.set("search",      search.trim());
    if (fechaDesde)          qs.set("fechaDesde",  fechaDesde);
    if (fechaHasta)          qs.set("fechaHasta",  fechaHasta);
    if (precioMin != null)   qs.set("precioMin",   String(precioMin));
    if (precioMax != null)   qs.set("precioMax",   String(precioMax));
    const query = qs.toString();
    return jsonOrThrow<PaginatedResponse<Event>>(
      await apiFetch(`/api/events${query ? `?${query}` : ""}`)
    );
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
