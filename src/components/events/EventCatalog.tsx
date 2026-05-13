"use client";

import { useState, useMemo } from "react";
import type { Event, Category } from "@/types";
import { CategoryFilter } from "./CategoryFilter";
import { EventGrid } from "./EventGrid";

interface EventCatalogProps {
  events: Event[];
  categories: Category[];
}

export function EventCatalog({ events, categories }: EventCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      selectedCategory === null
        ? events
        : events.filter((e) => e.categoriaId === selectedCategory),
    [events, selectedCategory]
  );

  const activeLabel =
    selectedCategory === null
      ? "Todos los eventos"
      : categories.find((c) => c.id === selectedCategory)?.nombre ?? "Eventos";

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black text-neo-black">
          {activeLabel}{" "}
          <span
            className="ml-2 px-2 py-0.5 text-sm font-black"
            style={{ border: "2px solid var(--neo-black)", background: "var(--neo-yellow)" }}
          >
            {filtered.length}
          </span>
        </h2>
      </div>

      <EventGrid events={filtered} />
    </div>
  );
}
