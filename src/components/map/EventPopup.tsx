"use client";

import Link from "next/link";
import type { MockEvent } from "@/data/mockEvents";

interface EventPopupProps {
  event: MockEvent;
}

export default function EventPopup({ event }: EventPopupProps) {
  return (
    <div className="p-3 min-w-[200px]">
      <h4 className="font-bold text-sm leading-tight mb-1">{event.title}</h4>
      <p className="text-xs text-neo-gray mb-1">
        {event.date} &middot; {event.startTime} – {event.endTime}
      </p>
      <span
        className="neo-tag text-[10px] mb-2 inline-block"
        style={{ backgroundColor: event.color, color: "#fff" }}
      >
        {event.category}
      </span>
      <p className="text-xs mb-3">{event.location.name}</p>
      <Link
        href={`/events/${event.id}`}
        className="neo-btn neo-btn-purple text-xs py-1 px-3 w-full text-center"
      >
        Ver Detalles
      </Link>
    </div>
  );
}
