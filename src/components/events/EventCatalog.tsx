"use client";

import { useState, useMemo } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { EventGrid } from "./EventGrid";

export function EventCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 300);

  const { events, loading: eventsLoading, error, usingMock } = useEvents(selectedCategory);
  const { categories, loading: catsLoading } = useCategories();

  /* ── Client-side search filter ── */
  const filteredEvents = useMemo(() => {
    if (!debouncedSearch.trim()) return events;
    const q = debouncedSearch.toLowerCase();
    return events.filter(
      (e) =>
        e.titulo.toLowerCase().includes(q) ||
        e.descripcion.toLowerCase().includes(q)
    );
  }, [events, debouncedSearch]);

  const activeLabel =
    selectedCategory === null
      ? "Todos los eventos"
      : (categories.find((c) => c.id === selectedCategory)?.nombre ?? "Eventos");

  const isFiltered = !!debouncedSearch.trim();

  function handleClearAll() {
    setSearchInput("");
    setSelectedCategory(null);
  }

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

      {/* ── Search bar ── */}
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-neo-gray mb-2">
          🔍 Buscar eventos
        </p>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Buscar por título o descripción…"
        />
      </div>

      {/* ── Category filter ── */}
      <CategoryFilter
        categories={catsLoading ? [] : categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* ── Results header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-lg font-black text-neo-black flex items-center gap-2">
          {isFiltered ? (
            <>
              Resultados para{" "}
              <span
                className="px-2 py-0.5 text-sm font-black italic"
                style={{ background: "var(--neo-yellow)", border: "2px solid var(--neo-black)" }}
              >
                &quot;{debouncedSearch}&quot;
              </span>
            </>
          ) : (
            activeLabel
          )}
          {!eventsLoading && (
            <span
              className="px-2 py-0.5 text-sm font-black"
              style={{ border: "2px solid var(--neo-black)", background: "var(--neo-yellow)" }}
            >
              {filteredEvents.length}
            </span>
          )}
        </h2>

        {/* Clear search shortcut */}
        {isFiltered && (
          <button
            onClick={handleClearAll}
            className="text-sm font-black text-neo-gray hover:text-neo-black underline"
          >
            ✕ Limpiar búsqueda
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      <EventGrid
        events={filteredEvents}
        loading={eventsLoading}
        onClearFilters={handleClearAll}
      />
    </div>
  );
}
