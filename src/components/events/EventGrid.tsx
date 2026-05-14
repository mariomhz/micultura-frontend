"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { EventCard } from "./EventCard";
import { EventSkeleton } from "./EventSkeleton";
import type { Event } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface EventGridProps {
  events: Event[];
  loading?: boolean;
  /** Called when the user clicks "Limpiar filtros" inside the empty state */
  onClearFilters?: () => void;
}

export function EventGrid({ events, loading = false, onClearFilters }: EventGridProps) {
  const { containerRef } = useGSAP(
    () => {
      if (loading || events.length === 0) return;

      gsap.from(".event-card-item", {
        y: 60,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    [loading, events.length]
  );

  /* ── Loading skeletons ── */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (events.length === 0) {
    return (
      <div
        className="relative overflow-hidden py-16 px-8 text-center"
        style={{
          border: "3px solid var(--neo-black)",
          boxShadow: "4px 4px 0 var(--neo-black)",
          background: "var(--neo-cream)",
        }}
      >
        {/* Decorative huge "0" in background */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-black text-neo-black select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem, 30vw, 18rem)", opacity: 0.04, lineHeight: 1 }}
        >
          0
        </span>

        {/* Icon */}
        <div
          className="relative z-10 inline-flex items-center justify-center w-20 h-20 text-4xl mb-6"
          style={{
            border: "3px solid var(--neo-black)",
            boxShadow: "4px 4px 0 var(--neo-black)",
            background: "var(--neo-white)",
          }}
        >
          🎭
        </div>

        {/* Message */}
        <h3 className="relative z-10 text-2xl md:text-3xl font-black text-neo-black mb-2">
          Nada por aquí
        </h3>
        <p className="relative z-10 text-neo-gray font-medium mb-8 max-w-xs mx-auto">
          Ningún evento coincide con los filtros actuales. Prueba a ajustar la búsqueda o las categorías.
        </p>

        {/* CTA */}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="relative z-10 neo-btn neo-btn-yellow font-black px-6 py-3"
            style={{ borderRadius: 0 }}
          >
            ✕ Limpiar filtros
          </button>
        )}
      </div>
    );
  }

  /* ── Event grid ── */
  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((event) => (
        <div key={event.id} className="event-card-item">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}
