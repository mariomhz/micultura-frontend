"use client";

import { useState, useMemo } from "react";
import { useEvents } from "@/hooks/useEvents";
import type { EventsParams } from "@/services/events.service";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { FilterPanel, type FilterState, type PriceRange } from "./FilterPanel";
import { EventGrid } from "./EventGrid";

const EMPTY_FILTERS: FilterState = { priceRange: null, dateFrom: "", dateTo: "" };

/** Translate the UI price-range pill to backend precioMin / precioMax */
function priceRangeToMinMax(range: PriceRange): Pick<EventsParams, "precioMin" | "precioMax"> {
  if (!range)          return {};
  if (range === "free")  return { precioMax: 0 };
  if (range === "0-10")  return { precioMin: 0.01, precioMax: 10 };
  if (range === "10-20") return { precioMin: 10.01, precioMax: 20 };
  if (range === "20+")   return { precioMin: 20.01 };
  return {};
}

export function EventCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchInput, setSearchInput]           = useState("");
  const [filters, setFilters]                   = useState<FilterState>(EMPTY_FILTERS);

  const debouncedSearch = useDebounce(searchInput, 300);

  const priceParams = useMemo(
    () => priceRangeToMinMax(filters.priceRange),
    [filters.priceRange]
  );

  const { events, loading: eventsLoading, error } = useEvents({
    category:    selectedCategory ?? undefined,
    search:      debouncedSearch.trim() || undefined,
    fechaDesde:  filters.dateFrom || undefined,
    fechaHasta:  filters.dateTo   || undefined,
    precioMin:   priceParams.precioMin,
    precioMax:   priceParams.precioMax,
  });

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
      {/* API error notice */}
      {error && (
        <div
          className="mb-6 px-4 py-3 flex items-center gap-3 bg-red-100 font-bold text-red-800 text-sm"
          style={{ border: "2px solid #b91c1c", boxShadow: "3px 3px 0 #b91c1c" }}
          role="alert"
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
              {events.length}
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
        events={events}
        loading={eventsLoading}
        onClearFilters={handleClearAll}
      />
    </div>
  );
}
