/**
 * Derives a display color from a category name.
 * Used by all components that need a per-event accent color.
 */
const COLORS: Record<string, string> = {
  "Música":      "#7c3aed",
  "Teatro":      "#b45309",
  "Arte":        "#db2777",
  "Festival":    "#d97706",
  "Cine":        "#1d4ed8",
  "Gastronomía": "#065f46",
  "Danza":       "#0891b2",
  "Literatura":  "#4f46e5",
};

export function getCategoryColor(nombre?: string): string {
  return (nombre && COLORS[nombre]) ?? "#1a1a1a";
}

/** Converts numeric price to display string. */
export function formatPrice(precio: number): string {
  return precio === 0 ? "Gratis" : `${precio}€`;
}
