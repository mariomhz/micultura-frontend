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
}

export function EventGrid({ events, loading = false }: EventGridProps) {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        className="py-24 text-center bg-neo-cream"
        style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
      >
        <p className="text-3xl font-black text-neo-black mb-2">🎭 Sin resultados</p>
        <p className="text-neo-gray font-medium">Prueba con otra categoría</p>
      </div>
    );
  }

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
