"use client";

import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por título o descripción…",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative flex w-full" role="search">
      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar eventos"
        autoComplete="off"
        className="flex-1 px-4 py-3 font-bold text-neo-black placeholder:text-neo-gray bg-white text-base
                   focus:outline-none"
        style={{
          border: "3px solid var(--neo-black)",
          borderRight: value ? "none" : "none",
          boxShadow: "none",
          borderRadius: 0,
          /* shadow on the whole group, not just input */
        }}
      />

      {/* Clear button — appears when there's text */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="px-3 bg-white font-black text-neo-gray hover:text-neo-black transition-colors text-lg"
          style={{
            border: "3px solid var(--neo-black)",
            borderLeft: "none",
            borderRight: "none",
            borderRadius: 0,
          }}
        >
          ✕
        </button>
      )}

      {/* Search button */}
      <button
        type="button"
        aria-label="Buscar"
        className="px-5 py-3 font-black text-neo-black text-lg shrink-0 transition-all duration-100
                   hover:translate-x-[2px] hover:translate-y-[2px]"
        style={{
          background: "var(--neo-yellow)",
          border: "3px solid var(--neo-black)",
          borderLeft: "none",
          boxShadow: "4px 4px 0 var(--neo-black)",
          borderRadius: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 var(--neo-black)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 var(--neo-black)";
        }}
      >
        🔍
      </button>

      {/* Hard shadow on the whole bar (pseudo-element via wrapper) */}
      <style>{`
        [role="search"] {
          box-shadow: 4px 4px 0 var(--neo-black);
        }
      `}</style>
    </div>
  );
}
