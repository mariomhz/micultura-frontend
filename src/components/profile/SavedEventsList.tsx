"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { Event } from "@/types";
import {
  listSavedEvents,
  unsaveEvent,
} from "@/services/users";
import { getCategoryColor, formatPrice } from "@/lib/categoryColors";

export default function SavedEventsList() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listSavedEvents()
      .then((data) => {
        if (!cancelled) setEvents(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRemove(eventoId: number) {
    if (!events) return;
    const previous = events;
    setEvents(events.filter((e) => e.id !== eventoId));
    try {
      await unsaveEvent(eventoId);
      toast.success("Evento eliminado de guardados");
    } catch (err) {
      setEvents(previous);
      const msg = err instanceof Error ? err.message : "No se pudo eliminar";
      toast.error(msg);
    }
  }

  if (error) {
    return (
      <div className="neo-card bg-red-100 border-red-400 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (events === null) {
    return <p className="text-neo-gray font-body">Cargando guardados…</p>;
  }

  if (events.length === 0) {
    return (
      <div className="neo-card p-6 text-center">
        <p className="font-body text-neo-gray">
          Aún no has guardado ningún evento.
        </p>
        <Link
          href="/events"
          className="inline-block mt-3 text-sm font-bold underline hover:opacity-70"
        >
          Explorar eventos →
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {events.map((event) => {
        const color = getCategoryColor(event.categoria?.nombre);
        const date = new Date(event.fecha + "T00:00:00").toLocaleDateString(
          "es-ES",
          { day: "numeric", month: "short", year: "numeric" }
        );
        return (
          <li key={event.id}>
            <div className="neo-card p-4 hover:transform-none hover:shadow-[var(--neo-shadow)] flex items-stretch gap-3">
              <Link
                href={`/events/${event.id}`}
                className="flex-1 flex items-center gap-3 min-w-0"
              >
                <div
                  className="w-14 h-14 rounded-lg border-3 border-neo-black flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: color + "15" }}
                >
                  <span
                    className="font-heading text-xl font-bold leading-none"
                    style={{ color }}
                  >
                    {new Date(event.fecha + "T00:00:00").getDate()}
                  </span>
                  <span className="font-body text-[9px] font-bold uppercase text-neo-gray">
                    {new Date(event.fecha + "T00:00:00").toLocaleDateString(
                      "es-ES",
                      { month: "short" }
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-bold truncate">
                    {event.titulo}
                  </h3>
                  <p className="text-xs text-neo-gray font-body truncate">
                    {date} · {event.ubicacion}
                  </p>
                  <span
                    className="inline-block mt-1 text-[10px] font-bold uppercase"
                    style={{ color }}
                  >
                    {event.categoria?.nombre} · {formatPrice(event.precio)}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(event.id)}
                aria-label="Quitar de guardados"
                className="neo-btn px-3 py-2 bg-neo-cream shrink-0 self-center"
                title="Quitar de guardados"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
