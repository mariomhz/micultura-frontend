"use client";

import { useState, useMemo } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { FilterPanel, type FilterState, type PriceRange } from "./FilterPanel";
import { EventGrid } from "./EventGrid";

const EMPTY_FILTERS: FilterState = { priceRange: null, dateFrom: "", dateTo: "" };

/* ── Price predicate ── */
function matchesPrice(precio: number, range: PriceRange): boolean {
  if (!range) return true;
  if (range === "free")  return precio === 0;
  if (range === "0-10")  return precio > 0 && precio <= 10;
  if (range === "10-20") return precio > 10 && precio <= 20;
  if (range === "20+")   return precio > 20;
  return true;
}

/* ── Date predicate ── */
function matchesDate(fecha: string, from: string, to: string): boolean {
  if (!from && !to) return true;
  const d = new Date(fecha);
  if (from && d < new Date(from)) return false;
  if (to   && d > new Date(to))   return false;
  return true;
}

export function EventCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchInput, setSearchInput]           = useState("");
  const [filters, setFilters]                   = useState<FilterState>(EMPTY_FILTERS);

  const debouncedSearch = useDebounce(searchInput, 300);

  const { events, loading: eventsLoading, error, usingMock } = useEvents(selectedCategory);
  const { categories, loading: catsLoading } = useCategories();

  /* ── Active filter count (excluding category, which has its own UI) ── */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch.trim()) count++;
    if (filters.priceRange)     count++;
    if (filters.dateFrom)       count++;
    if (filters.dateTo)         count++;
    return count;
  }, [debouncedSearch, filters]);

  /* ── Client-side filtering ── */
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // text search
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        if (
          !e.titulo.toLowerCase().includes(q) &&
          !e.descripcion.toLowerCase().includes(q)
        ) return false;
      }
      // price
      if (!matchesPrice(e.precio, filters.priceRange)) return false;
      // date
      if (!matchesDate(e.fecha, filters.dateFrom, filters.dateTo)) return false;
      return true;
    });
  }, [events, debouncedSearch, filters]);

  const activeLabel =
    selectedCategory === null
      ? "Todos los eventos"
      : (categories.find((c) => c.id === selectedCategory)?.nombre ?? "Eventos");

  function handleClearAll() {
    setSearchInput("");
    setSelectedCategory(null);
    setFilters(EMPTY_FILTERS);
  }

  function handleClearFiltersOnly() {
    setSearchInput("");
    setFilters(EMPTY_FILTERS);
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

      {/* ── Advanced filter panel ── */}
      <FilterPanel
        filters={filters}
        activeCount={activeFilterCount}
        onFiltersChange={setFilters}
        onClearAll={handleClearFiltersOnly}
      />

      {/* ── Results header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-lg font-black text-neo-black flex items-center gap-2 flex-wrap">
          {debouncedSearch.trim() ? (
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

        {/* Total active filter count badge */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFiltersOnly}
            className="text-sm font-black text-neo-gray hover:text-neo-black underline"
          >
            ✕ Limpiar filtros ({activeFilterCount})
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
