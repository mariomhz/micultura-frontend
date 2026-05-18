"use client";

import { useMemo } from "react";
import { useEvents } from "@/hooks/useEvents";

/**
 * Two infinite-scroll marquee rows that close out the hero:
 *
 *   1. Top row — solid white text, smaller weight, scrolls RIGHT-to-LEFT.
 *      Static category list (always available, no loading state).
 *   2. Bottom row — massive outlined yellow text, scrolls LEFT-to-RIGHT.
 *      Real upcoming events from the backend ("TITLE — DD MES"), falls back
 *      to category names while the API request is in flight.
 *
 * Each row pauses on hover and is announced as a single aria-region so screen
 * readers don't get an infinite-scroll torture session.
 */

const CATEGORIES = [
  "Música",
  "Teatro",
  "Arte",
  "Cine",
  "Gastronomía",
  "Festival",
];

type MarqueeRowProps = {
  items: string[];
  separator: string;
  speedSeconds: number;
  direction: "left" | "right";
  variant: "compact" | "display";
};

function MarqueeRow({
  items,
  separator,
  speedSeconds,
  direction,
  variant,
}: MarqueeRowProps) {
  // Each strip must be at least as wide as the viewport for the -50% loop
  // to feel seamless. Short lists (e.g. 6 categories) don't fill that on
  // their own, so we tile the items enough times inside each strip before
  // duplicating the strip itself for the loop.
  const repeats = Math.max(2, Math.ceil(20 / items.length));
  const filledItems = Array.from({ length: repeats }, () => items).flat();

  const renderStrip = (key: string) => (
    <div key={key} className={`hero-marquee-strip hero-marquee-${variant}`}>
      {filledItems.map((item, i) => (
        <span key={`${key}-${i}`} className="hero-marquee-cell">
          <span>{item}</span>
          <span className="hero-marquee-sep" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`hero-marquee-row hero-marquee-row-${variant}`} role="marquee">
      <div
        className="hero-marquee-track"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {renderStrip("a")}
        {renderStrip("b")}
      </div>
    </div>
  );
}

function formatEventLabel(titulo: string, fecha: string): string {
  const date = new Date(fecha + "T00:00:00");
  const short = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
  // "27 may." → "27 MAY"
  return `${titulo.toUpperCase()} — ${short.replace(".", "").toUpperCase()}`;
}

export default function HeroMarquee() {
  const { events, loading } = useEvents();

  const eventLabels = useMemo(() => {
    if (loading || events.length === 0) {
      return CATEGORIES.map((c) => c.toUpperCase());
    }
    return events
      .slice(0, 14)
      .map((e) => formatEventLabel(e.titulo, e.fecha));
  }, [events, loading]);

  const categoryLabels = useMemo(
    () => CATEGORIES.map((c) => c.toUpperCase()),
    []
  );

  return (
    <div className="hero-marquees" aria-label="Próximos eventos">
      <MarqueeRow
        items={categoryLabels}
        separator="·"
        speedSeconds={18}
        direction="right"
        variant="compact"
      />
      <MarqueeRow
        items={eventLabels}
        separator="▸"
        speedSeconds={320}
        direction="left"
        variant="display"
      />
    </div>
  );
}
