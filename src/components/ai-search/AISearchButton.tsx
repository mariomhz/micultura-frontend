"use client";

import { useState } from "react";
import AISearchSheet from "./AISearchSheet";

/**
 * Floating action button anchored bottom-right that opens the AI search sheet.
 * Neo-brutalist yellow chip with thick black border + hard shadow; subtle
 * pulse animation draws attention without being obnoxious.
 */
export default function AISearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ai-fab"
        aria-label="Abrir búsqueda inteligente"
      >
        <span className="ai-fab-label">Pregunta a la IA</span>
        <span className="ai-fab-icon" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
          </svg>
        </span>
      </button>

      {open && <AISearchSheet onClose={() => setOpen(false)} />}
    </>
  );
}
