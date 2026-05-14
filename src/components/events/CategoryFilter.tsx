"use client";

import type { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="mb-8 p-4 bg-neo-cream"
      style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
    >
      <p className="text-xs font-black uppercase tracking-widest text-neo-gray mb-3">
        Filtrar por categoría
      </p>
      {/* neo-scroll-x: horizontal scroll on mobile, wraps on sm+ */}
      <div className="neo-scroll-x">
        {/* "Todos" chip */}
        <button
          onClick={() => onSelect(null)}
          className="px-4 py-2 font-black text-sm transition-all duration-100 shrink-0"
          style={
            selected === null
              ? {
                  border: "2px solid var(--neo-black)",
                  background: "var(--neo-black)",
                  color: "var(--neo-yellow)",
                  boxShadow: "none",
                  transform: "translate(2px, 2px)",
                }
              : {
                  border: "2px solid var(--neo-black)",
                  background: "var(--neo-white)",
                  color: "var(--neo-black)",
                  boxShadow: "2px 2px 0 var(--neo-black)",
                }
          }
        >
          🗂️ Todos
        </button>

        {/* Category chips */}
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(isActive ? null : cat.id)}
              className="px-4 py-2 font-black text-sm transition-all duration-100 shrink-0 whitespace-nowrap"
              style={
                isActive
                  ? {
                      border: "2px solid var(--neo-black)",
                      background: "var(--neo-purple)",
                      color: "white",
                      boxShadow: "none",
                      transform: "translate(2px, 2px)",
                    }
                  : {
                      border: "2px solid var(--neo-black)",
                      background: "var(--neo-white)",
                      color: "var(--neo-black)",
                      boxShadow: "2px 2px 0 var(--neo-black)",
                    }
              }
            >
              {cat.icono} {cat.nombre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
