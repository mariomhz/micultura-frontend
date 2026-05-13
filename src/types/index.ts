// ── Database entity types ──────────────────────────────────────────────────

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: UserRole;
  createdAt: string; // ISO-8601
}

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string; // icon name or URL
}

export interface Event {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;       // ISO-8601 date  (YYYY-MM-DD)
  hora: string;        // HH:mm
  ubicacion: string;
  latitud: number;
  longitud: number;
  categoriaId: number;
  categoria?: Category;
  imagenUrl: string;
  precio: number;
  enlaceCompra: string;
}

// ── API envelope types ─────────────────────────────────────────────────────

export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-indexed)
  size: number;
}
