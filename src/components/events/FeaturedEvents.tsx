"use client";

import Link from "next/link";
import { mockEvents } from "@/data/mockEvents";

const categoryEmoji: Record<string, string> = {
  Festival: "🎉",
  Arte: "🎨",
  Música: "🎶",
  Taller: "🛠️",
  Feria: "🎪",
  Historia: "🏛️",
  Cine: "🎬",
  Gastronomía: "🍝",
  Teatro: "🎭",
  Bienestar: "🧘",
};

export default function FeaturedEvents() {
  const featured = mockEvents.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((event) => {
        const emoji = categoryEmoji[event.category] || "📍";
        const dateFormatted = new Date(event.date + "T00:00:00").toLocaleDateString(
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
                src={event.imagen}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${event.color}cc 0%, transparent 60%)`,
                }}
              />
              <span
                className="neo-tag text-[10px] absolute bottom-2 left-3"
                style={{ backgroundColor: "white", color: event.color }}
              >
                {emoji} {event.category}
              </span>
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold text-neo-gray">
                  {dateFormatted}
                </span>
                <span className="neo-tag bg-neo-yellow text-neo-black text-[10px]">
                  {event.price}
                </span>
              </div>

              <h3 className="font-heading text-sm font-bold leading-tight">
                {event.title}
              </h3>

              <p className="text-xs text-neo-gray font-body leading-snug mt-auto">
                📍 {event.location.name}
              </p>

              <div className="flex items-center justify-between pt-2 border-t-2 border-neo-black/10">
                <span className="text-xs text-neo-gray font-body">
                  {event.startTime} – {event.endTime}
                </span>
                <span
                  className="text-xs font-bold font-body transition-colors"
                  style={{ color: event.color }}
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
