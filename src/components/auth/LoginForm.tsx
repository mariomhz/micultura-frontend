"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, type AuthError } from "@/services/auth";
import { setToken } from "@/lib/token";
import { NeoFadeIn } from "@/components/animations/NeoAnimations";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      setToken(res.token);
      router.push("/");
    } catch (err) {
      const authErr = err as AuthError;
      setError(authErr.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <NeoFadeIn>
      <form
        onSubmit={handleSubmit}
        className="neo-card w-full max-w-md mx-auto p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        {error && (
          <div className="neo-card bg-red-100 border-red-400 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="neo-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="neo-input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="neo-btn neo-btn-purple w-full disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <p className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="underline font-semibold hover:opacity-70">
            Registrarse
          </Link>
        </p>
      </form>
    </NeoFadeIn>
  );
}
