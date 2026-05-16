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

export interface EventsParams {
  category?:   number;
  search?:     string;
  fechaDesde?: string;
  fechaHasta?: string;
  precioMin?:  number;
  precioMax?:  number;
  page?:       number;
  size?:       number;
  sort?:       string;
}

async function jsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}

export const eventsService = {
  getAll: async (params: EventsParams = {}): Promise<PaginatedResponse<Event>> => {
    const qs = new URLSearchParams();
    if (params.category  != null)  qs.set("category",   String(params.category));
    if (params.search?.trim())     qs.set("search",      params.search!.trim());
    if (params.fechaDesde)         qs.set("fechaDesde",  params.fechaDesde);
    if (params.fechaHasta)         qs.set("fechaHasta",  params.fechaHasta);
    if (params.precioMin != null)  qs.set("precioMin",   String(params.precioMin));
    if (params.precioMax != null)  qs.set("precioMax",   String(params.precioMax));
    if (params.page      != null)  qs.set("page",        String(params.page));
    if (params.size      != null)  qs.set("size",        String(params.size));
    if (params.sort)               qs.set("sort",        params.sort);
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
