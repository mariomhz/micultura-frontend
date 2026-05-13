"use client";

import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { CategoryFilter } from "./CategoryFilter";
import { EventGrid } from "./EventGrid";

export function EventCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { events, loading: eventsLoading, error, usingMock } = useEvents(selectedCategory);
  const { categories, loading: catsLoading } = useCategories();

  const activeLabel =
    selectedCategory === null
      ? "Todos los eventos"
      : (categories.find((c) => c.id === selectedCategory)?.nombre ?? "Eventos");

  return (
    <div>
      {/* Dev/offline notice */}
      {usingMock && (
        <div
          className="mb-6 px-4 py-3 flex items-center gap-3 bg-neo-yellow font-bold text-neo-black text-sm"
          style={{ border: "2px solid var(--neo-black)", boxShadow: "3px 3px 0 var(--neo-black)" }}
          role="status"
        >
          <span className="text-lg">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Filter bar */}
      <CategoryFilter
        categories={catsLoading ? [] : categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Count heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black text-neo-black">
          {activeLabel}{" "}
          {!eventsLoading && (
            <span
              className="ml-2 px-2 py-0.5 text-sm font-black"
              style={{ border: "2px solid var(--neo-black)", background: "var(--neo-yellow)" }}
            >
              {events.length}
            </span>
          )}
        </h2>
      </div>

      {/* Grid */}
      <EventGrid events={events} loading={eventsLoading} />
    </div>
  );
}
