"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <>
        <Link href="/login" className="underline hover:opacity-70">
          Iniciar Sesión
        </Link>
        <Link href="/register" className="neo-btn neo-btn-yellow text-sm py-1.5 px-3">
          Registrarse
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="neo-tag">{user?.nombre}</span>
      <LogoutButton />
    </>
  );
}

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="underline hover:opacity-70 text-sm">
      Cerrar Sesión
    </button>
  );
}
