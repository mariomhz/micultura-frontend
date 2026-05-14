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
      <span className="neo-tag hidden sm:inline-block truncate max-w-[100px]">
        {user?.nombre}
      </span>
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
