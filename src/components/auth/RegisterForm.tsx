"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateRegisterForm, type RegisterFormErrors } from "@/lib/validators";
import { register, type AuthError } from "@/services/auth";
import { NeoFadeIn } from "@/components/animations/NeoAnimations";

export default function RegisterForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const validation = validateRegisterForm({ nombre, email, password, confirm });
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      await register({ nombre, email, password });
      router.push("/login");
    } catch (err) {
      const authErr = err as AuthError;
      setServerError(authErr.message || "Error al registrar. Intenta de nuevo.");
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
        <h2 className="text-2xl font-bold text-center">Crear Cuenta</h2>

        {serverError && (
          <div className="neo-card bg-red-100 border-red-400 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="neo-input w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

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
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
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
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-semibold mb-1">
            Confirmar Contraseña
          </label>
          <input
            id="confirm"
            type="password"
            className="neo-input w-full"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {errors.confirm && (
            <p className="text-red-600 text-sm mt-1">{errors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="neo-btn neo-btn-purple w-full disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="underline font-semibold hover:opacity-70">
            Iniciar Sesión
          </Link>
        </p>
      </form>
    </NeoFadeIn>
  );
}
