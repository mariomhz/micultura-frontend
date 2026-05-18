"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { aiSearch, type AISearchResponse } from "@/services/ai-search.service";

interface Props {
  onClose: () => void;
}

const SUGGESTIONS = [
  "Algo gratis este fin de semana",
  "Música en vivo en Santa Cruz",
  "Para hacer con niños",
  "Cine al aire libre",
  "Exposiciones de arte esta semana",
];

export default function AISearchSheet({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    // Lock body scroll while the sheet is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await aiSearch(trimmed);
      setResult(res);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No pude buscar ahora mismo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(query);
  }

  return (
    <div
      className="ai-sheet-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda inteligente"
    >
      <div className="ai-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ai-sheet-header">
          <div>
            <p className="ai-sheet-eyebrow">Asistente cultural</p>
            <h2 className="ai-sheet-title">¿Qué te apetece hacer?</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ai-sheet-close"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ai-sheet-form">
          <input
            ref={inputRef}
            type="text"
            className="ai-sheet-input"
            placeholder="Ej. Algo barato este sábado al aire libre"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            maxLength={500}
          />
          <button
            type="submit"
            className="ai-sheet-submit"
            disabled={loading || !query.trim()}
          >
            {loading ? "Pensando…" : "Buscar"}
          </button>
        </form>

        {!result && !loading && !error && (
          <div className="ai-sheet-suggestions">
            <p className="ai-sheet-suggestions-label">Prueba con</p>
            <div className="ai-sheet-suggestions-chips">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => runSearch(s)}
                  className="ai-sheet-chip"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="ai-sheet-loading">
            <span className="ai-sheet-dot" />
            <span className="ai-sheet-dot" />
            <span className="ai-sheet-dot" />
          </div>
        )}

        {error && <p className="ai-sheet-error">{error}</p>}

        {result && (
          <div className="ai-sheet-results">
            <p className="ai-sheet-reasoning">{result.reasoning}</p>

            {result.events.length === 0 ? (
              <p className="ai-sheet-empty">
                No encontré eventos que coincidan. Prueba con otra búsqueda.
              </p>
            ) : (
              <ul className="ai-sheet-results-list">
                {result.events.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/events/${e.id}`}
                      onClick={onClose}
                      className="ai-sheet-result-card"
                    >
                      <div className="ai-sheet-result-meta">
                        <span className="ai-sheet-result-date">
                          {formatDate(e.fecha)}
                        </span>
                        {e.categoria?.nombre && (
                          <span className="ai-sheet-result-cat">
                            {e.categoria.nombre}
                          </span>
                        )}
                      </div>
                      <h3 className="ai-sheet-result-title">{e.titulo}</h3>
                      <p className="ai-sheet-result-loc">📍 {e.ubicacion}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="ai-sheet-footer">
          Powered by Gemini · Las respuestas pueden contener errores.
        </p>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d
    .toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
    .toUpperCase()
    .replace(/\./g, "");
}
