"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface AuthStatusProps {
  /** When true, hides the text "Iniciar Sesión" link on mobile (< sm) */
  compact?: boolean;
}

export default function AuthStatus({ compact = false }: AuthStatusProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className={`text-sm underline hover:opacity-70 whitespace-nowrap${compact ? " hidden sm:inline" : ""}`}
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="neo-btn neo-btn-yellow text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3 whitespace-nowrap"
          style={{ borderRadius: 0 }}
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        className="neo-tag hidden sm:inline-block truncate max-w-[120px] hover:opacity-80"
        title="Ir a mi perfil"
      >
        {user?.nombre}
      </Link>
      <Link
        href="/profile"
        aria-label="Mi perfil"
        className="sm:hidden inline-flex items-center justify-center w-9 h-9 border-[2px] border-neo-black bg-white"
        style={{ boxShadow: "2px 2px 0 var(--neo-black)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>
      <LogoutButton />
    </div>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="underline hover:opacity-70 text-sm whitespace-nowrap"
    >
      Salir
    </button>
  );
}
