"use client";

import Link from "next/link";
import type { Event } from "@/types";
import { getCategoryColor } from "@/lib/categoryColors";

interface EventListPanelProps {
  date: string | null;
  events: Event[];
  onClose: () => void;
}

export default function EventListPanel({ date, events, onClose }: EventListPanelProps) {
  if (!date) return null;

  const formatted = new Date(date + "T00:00:00").toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="neo-card p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold capitalize">{formatted}</h3>
        <button onClick={onClose} className="neo-btn py-1 px-3 text-sm bg-neo-cream">
          Cerrar
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-neo-gray text-sm">No hay eventos para esta fecha.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => {
            const color = getCategoryColor(event.categoria?.nombre);
            return (
              <li key={event.id}>
                <Link
                  href={`/events/${event.id}`}
                  className="flex items-start gap-3 p-3 border-2 border-neo-black rounded-lg hover:bg-neo-cream transition-colors"
                >
                  <span
                    className="mt-1 w-3 h-3 rounded-full border-2 border-neo-black shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm leading-tight">{event.titulo}</p>
                    <p className="text-xs text-neo-gray mt-1">
                      {event.hora} &middot; {event.ubicacion}
                    </p>
                    <span
                      className="neo-tag mt-2 text-[10px]"
                      style={{ backgroundColor: color, color: "#fff" }}
                    >
                      {event.categoria?.icono} {event.categoria?.nombre}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
