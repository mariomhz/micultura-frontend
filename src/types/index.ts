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
  icono: string;
}

export interface Event {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;          // YYYY-MM-DD
  hora: string | null;    // HH:mm — nullable in entity
  ubicacion: string;
  latitud: number | null;
  longitud: number | null;
  categoria: Category;    // always populated (EAGER fetch, no categoriaId)
  imagenUrl: string | null;
  precio: number;
  enlaceCompra: string | null;
}

// ── API envelope types ─────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  code: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
