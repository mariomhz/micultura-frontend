"use client";

import Link from "next/link";
import type { Event } from "@/types";
import { getCategoryColor, formatPrice } from "@/lib/categoryColors";

interface EventPopupProps {
  event: Event;
}

export default function EventPopup({ event }: EventPopupProps) {
  const color = getCategoryColor(event.categoria?.nombre);

  return (
    <div className="p-3 min-w-[200px]">
      <h4 className="font-bold text-sm leading-tight mb-1">{event.titulo}</h4>
      <p className="text-xs text-neo-gray mb-1">
        {event.fecha} &middot; {event.hora}
      </p>
      <span
        className="neo-tag text-[10px] mb-2 inline-block"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {event.categoria?.icono} {event.categoria?.nombre}
      </span>
      <p className="text-xs mb-1">{event.ubicacion}</p>
      <p className="text-xs font-bold mb-3">{formatPrice(event.precio)}</p>
      <Link
        href={`/events/${event.id}`}
        className="neo-btn neo-btn-purple text-xs py-1 px-3 w-full text-center"
      >
        Ver Detalles
      </Link>
    </div>
  );
}
