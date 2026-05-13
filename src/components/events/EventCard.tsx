"use client";

import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/types";

function formatDate(fecha: string): string {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<number, string> = {
  1: "bg-neo-purple text-white",
  2: "bg-neo-gold text-white",
  3: "bg-neo-lilac text-neo-black",
  4: "bg-neo-black text-white",
  5: "bg-neo-yellow text-neo-black",
  6: "bg-neo-cream text-neo-black",
};

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const tagColor = CATEGORY_COLORS[event.categoriaId] ?? "bg-neo-cream text-neo-black";

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block overflow-hidden bg-neo-cream"
      style={{
        border: "3px solid var(--neo-black)",
        boxShadow: "4px 4px 0 var(--neo-black)",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 var(--neo-black)";
        (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 var(--neo-black)";
        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", borderBottom: "3px solid var(--neo-black)" }}
      >
        <Image
          src={event.imagenUrl || `https://picsum.photos/seed/event-${event.id}/800/450`}
          alt={event.titulo}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category badge */}
        {event.categoria && (
          <span
            className={`self-start px-2 py-0.5 text-xs font-black uppercase ${tagColor}`}
            style={{ border: "2px solid var(--neo-black)" }}
          >
            {event.categoria.icono} {event.categoria.nombre}
          </span>
        )}

        {/* Title */}
        <h3
          className="font-black text-lg leading-tight text-neo-black"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.titulo}
        </h3>

        {/* Date */}
        <p className="text-sm font-bold text-neo-black flex items-center gap-1">
          <span aria-hidden>📅</span>
          {formatDate(event.fecha)} · {event.hora}
        </p>

        {/* Location */}
        <p
          className="text-sm text-neo-gray flex items-center gap-1"
          style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          <span aria-hidden>📍</span>
          {event.ubicacion}
        </p>

        {/* Price row */}
        <div className="mt-1 flex items-center justify-between">
          <span
            className="px-3 py-1 font-black text-sm"
            style={{
              border: "2px solid var(--neo-black)",
              background: event.precio === 0 ? "var(--neo-yellow)" : "var(--neo-purple)",
              color: event.precio === 0 ? "var(--neo-black)" : "white",
            }}
          >
            {event.precio === 0 ? "Gratis" : `${event.precio} €`}
          </span>
          <span className="text-sm font-black text-neo-black group-hover:translate-x-1 transition-transform inline-block">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  );
}
