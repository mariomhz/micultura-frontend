"use client";

import dynamic from "next/dynamic";

/**
 * MapSection — wraps the Leaflet map with a responsive container.
 *
 * IMPORTANT: Leaflet needs an explicit pixel height on the DOM node at mount
 * time. The height lives here on the wrapper (.neo-map-container from
 * globals.css: 280px mobile / 480px sm+). EventMap fills 100% of that.
 */

const EventMap = dynamic(() => import("./EventMap"), {
  ssr: false,
  loading: () => (
    <div
      className="neo-map-container flex items-center justify-center bg-neo-cream"
      style={{ border: "3px solid var(--neo-black)", width: "100%" }}
    >
      <p className="text-neo-gray font-bold animate-pulse">Cargando mapa…</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    /* neo-map-container sets the height (280px / 480px via CSS media query) */
    <div
      className="neo-card neo-map-container overflow-hidden hover:transform-none hover:shadow-[var(--neo-shadow)]"
    >
      <EventMap />
    </div>
  );
}
