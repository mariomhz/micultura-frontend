// Offline snapshot of the seeded catalogue, used when the API cannot be
// reached. Dates are stored as day offsets and resolved against today, so the
// events stay upcoming no matter when the snapshot is served.

import snapshot from "@/data/fallbackEvents.json";
import type { Category, Event, PaginatedResponse } from "@/types";
import type { EventsParams } from "@/services/events.service";

interface SnapshotEvent {
  id: number;
  titulo: string;
  descripcion: string;
  offsetDays: number;
  hora: string | null;
  ubicacion: string;
  latitud: number | null;
  longitud: number | null;
  categoriaId: number;
  imagenUrl: string | null;
  precio: number;
  enlaceCompra: string | null;
}

const categories: Category[] = snapshot.categories;
const rawEvents = snapshot.events as SnapshotEvent[];

let fallbackActive = false;

/** True once any request has been served from the snapshot. */
export function isFallbackActive(): boolean {
  return fallbackActive;
}

export function markFallbackActive(): void {
  fallbackActive = true;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function hydrate(raw: SnapshotEvent): Event {
  const date = startOfToday();
  date.setDate(date.getDate() + raw.offsetDays);

  const categoria =
    categories.find((c) => c.id === raw.categoriaId) ?? categories[0];

  return {
    id: raw.id,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    fecha: toIsoDate(date),
    hora: raw.hora,
    ubicacion: raw.ubicacion,
    latitud: raw.latitud,
    longitud: raw.longitud,
    categoria,
    imagenUrl: raw.imagenUrl,
    precio: raw.precio,
    enlaceCompra: raw.enlaceCompra,
  };
}

export function fallbackCategories(): Category[] {
  markFallbackActive();
  return categories;
}

export function fallbackEventById(id: number): Event | null {
  markFallbackActive();
  const raw = rawEvents.find((e) => e.id === id);
  return raw ? hydrate(raw) : null;
}

/**
 * Mirrors the filtering the backend applies in EventoSpecification, including
 * the implicit "not finished yet" rule, so the offline catalogue behaves the
 * same way the live one does.
 */
export function fallbackEvents(
  params: EventsParams = {}
): PaginatedResponse<Event> {
  markFallbackActive();

  const today = toIsoDate(startOfToday());
  const search = params.search?.trim().toLowerCase();

  let matches = rawEvents.map(hydrate).filter((event) => event.fecha >= today);

  if (params.category != null) {
    matches = matches.filter((e) => e.categoria.id === params.category);
  }
  if (search) {
    matches = matches.filter(
      (e) =>
        e.titulo.toLowerCase().includes(search) ||
        e.descripcion.toLowerCase().includes(search)
    );
  }
  if (params.fechaDesde) {
    matches = matches.filter((e) => e.fecha >= params.fechaDesde!);
  }
  if (params.fechaHasta) {
    matches = matches.filter((e) => e.fecha <= params.fechaHasta!);
  }
  if (params.precioMin != null) {
    matches = matches.filter((e) => e.precio >= params.precioMin!);
  }
  if (params.precioMax != null) {
    matches = matches.filter((e) => e.precio <= params.precioMax!);
  }

  matches.sort((a, b) =>
    a.fecha === b.fecha
      ? (a.hora ?? "").localeCompare(b.hora ?? "")
      : a.fecha.localeCompare(b.fecha)
  );

  const size = params.size ?? 20;
  const page = params.page ?? 0;
  const totalElements = matches.length;
  const totalPages = size > 0 ? Math.ceil(totalElements / size) : 1;

  return {
    content: matches.slice(page * size, page * size + size),
    page,
    size,
    totalElements,
    totalPages,
    last: page >= totalPages - 1,
  };
}
