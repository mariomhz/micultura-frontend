"use client";

import Link from "next/link";
import { useEvents } from "@/hooks/useEvents";
import { getCategoryColor, formatPrice } from "@/lib/categoryColors";

export default function FeaturedEvents() {
  const { events, loading } = useEvents();
  const featured = events.slice(0, 4);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="neo-card p-0 overflow-hidden">
            <div className="neo-shimmer h-36" />
            <div className="p-4 space-y-2">
              <div className="neo-shimmer h-4 w-2/3 rounded" />
              <div className="neo-shimmer h-3 w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((event) => {
        const color = getCategoryColor(event.categoria?.nombre);
        const emoji = event.categoria?.icono ?? "📍";
        const dateFormatted = new Date(event.fecha + "T00:00:00").toLocaleDateString(
          "es-ES",
          { day: "numeric", month: "short" }
        );

        return (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="neo-card p-0 flex flex-col bg-white group overflow-hidden"
          >
            {/* Card image */}
            <div className="relative h-36 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.imagenUrl ?? ""}
                alt={event.titulo}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${color}cc 0%, transparent 60%)`,
                }}
              />
              <span
                className="neo-tag text-[10px] absolute bottom-2 left-3"
                style={{ backgroundColor: "white", color }}
              >
                {emoji} {event.categoria?.nombre}
              </span>
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold text-neo-gray">
                  {dateFormatted}
                </span>
                <span className="neo-tag bg-neo-yellow text-neo-black text-[10px]">
                  {formatPrice(event.precio)}
                </span>
              </div>

              <h3 className="font-heading text-sm font-bold leading-tight">
                {event.titulo}
              </h3>

              <p className="text-xs text-neo-gray font-body leading-snug mt-auto">
                📍 {event.ubicacion}
              </p>

              <div className="flex items-center justify-between pt-2 border-t-2 border-neo-black/10">
                <span className="text-xs text-neo-gray font-body">
                  {event.hora}
                </span>
                <span
                  className="text-xs font-bold font-body transition-colors"
                  style={{ color }}
                >
                  Ver detalles →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
