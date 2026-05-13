"use client";

import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./EventMap"), {
  ssr: false,
  loading: () => (
    <div className="neo-card flex items-center justify-center" style={{ height: "480px" }}>
      <p className="text-neo-gray font-bold animate-pulse">Cargando mapa...</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <div className="neo-card overflow-hidden hover:transform-none hover:shadow-[var(--neo-shadow)]">
      <EventMap />
    </div>
  );
}
