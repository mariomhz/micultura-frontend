"use client";

import { useState } from "react";

/* ── Types ── */
export type PriceRange = "free" | "0-10" | "10-20" | "20+" | null;

export interface FilterState {
  priceRange: PriceRange;
  dateFrom: string;
  dateTo: string;
}

interface FilterPanelProps {
  filters: FilterState;
  activeCount: number;
  onFiltersChange: (filters: FilterState) => void;
  onClearAll: () => void;
}

/* ── Price chip definitions ── */
const PRICE_OPTIONS: { value: PriceRange; label: string; bg: string; color: string }[] = [
  { value: "free",  label: "🎟️ Gratis",  bg: "var(--neo-yellow)",      color: "var(--neo-black)" },
  { value: "0-10",  label: "0 – 10 €",  bg: "var(--neo-gold-light)",   color: "var(--neo-black)" },
  { value: "10-20", label: "10 – 20 €", bg: "var(--neo-lilac)",        color: "var(--neo-black)" },
  { value: "20+",   label: "20 € +",    bg: "var(--neo-purple)",       color: "white"             },
];

/* ── Component ── */
export function FilterPanel({ filters, activeCount, onFiltersChange, onClearAll }: FilterPanelProps) {
  const [open, setOpen] = useState(false);   // mobile collapse state

  function setPrice(value: PriceRange) {
    onFiltersChange({
      ...filters,
      priceRange: filters.priceRange === value ? null : value,
    });
  }

  function setDate(field: "dateFrom" | "dateTo", value: string) {
    onFiltersChange({ ...filters, [field]: value });
  }

  /* ── Pill chip styles ── */
  function chipStyle(active: boolean, bg: string, color: string) {
    return active
      ? {
          background: bg,
          color,
          border: "2px solid var(--neo-black)",
          boxShadow: "none",
          transform: "translate(2px, 2px)",
        }
      : {
          background: "var(--neo-white)",
          color: "var(--neo-black)",
          border: "2px solid var(--neo-black)",
          boxShadow: "2px 2px 0 var(--neo-black)",
        };
  }

  return (
    <div
      className="mb-6"
      style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
    >
      {/* ── Header (always visible) ── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neo-black text-white font-black text-sm uppercase tracking-widest sm:cursor-default"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span>⚙️ Filtros</span>
          {activeCount > 0 && (
            <span
              className="px-2 py-0.5 text-xs font-black"
              style={{ background: "var(--neo-yellow)", color: "var(--neo-black)", border: "2px solid var(--neo-black)" }}
            >
              {activeCount} activo{activeCount !== 1 ? "s" : ""}
            </span>
          )}
        </span>

        <span className="flex items-center gap-3">
          {activeCount > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onClearAll(); }}
              onKeyDown={(e) => e.key === "Enter" && onClearAll()}
              className="text-xs font-black underline text-neo-yellow hover:no-underline"
            >
              Limpiar todo
            </span>
          )}
          {/* Chevron — only visible on mobile */}
          <span
            className="sm:hidden text-neo-yellow transition-transform duration-200"
            style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden
          >
            ▼
          </span>
        </span>
      </button>

      {/* ── Filter body — hidden on mobile until open, always visible on sm+ ── */}
      <div
        className="overflow-hidden sm:!max-h-none sm:!overflow-visible"
        style={{
          maxHeight: open ? "600px" : "0",
          transition: "max-height 0.3s ease",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-neo-cream">

          {/* ── Price ── */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-neo-gray mb-3">
              💰 Precio
            </p>
            <div className="neo-scroll-x">
              {PRICE_OPTIONS.map(({ value, label, bg, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPrice(value)}
                  className="px-3 py-1.5 font-black text-sm shrink-0 whitespace-nowrap transition-all duration-100"
                  style={chipStyle(filters.priceRange === value, bg, color)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Date range ── */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-neo-gray mb-3">
              📅 Rango de fechas
            </p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setDate("dateFrom", e.target.value)}
                aria-label="Fecha desde"
                className="flex-1 px-3 py-1.5 text-sm font-bold bg-white text-neo-black"
                style={{
                  border: "2px solid var(--neo-black)",
                  boxShadow: "2px 2px 0 var(--neo-black)",
                  borderRadius: 0,
                  outline: "none",
                  minWidth: 0,
                }}
              />
              <span className="font-black text-neo-black shrink-0">→</span>
              <input
                type="date"
                value={filters.dateTo}
                min={filters.dateFrom || undefined}
                onChange={(e) => setDate("dateTo", e.target.value)}
                aria-label="Fecha hasta"
                className="flex-1 px-3 py-1.5 text-sm font-bold bg-white text-neo-black"
                style={{
                  border: "2px solid var(--neo-black)",
                  boxShadow: "2px 2px 0 var(--neo-black)",
                  borderRadius: 0,
                  outline: "none",
                  minWidth: 0,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
