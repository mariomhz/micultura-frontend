"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMe, type MeResponse } from "@/services/users";
import { NeoFadeIn } from "@/components/animations/NeoAnimations";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import SavedEventsList from "@/components/profile/SavedEventsList";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/login?next=/profile");
      return;
    }
    let cancelled = false;
    getMe()
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || "No se pudo cargar el perfil");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || loading) {
    return (
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <p className="text-center">Cargando perfil…</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="neo-card bg-red-100 border-red-400 p-4 text-red-700">
          {error || "No se pudo cargar el perfil"}
        </div>
      </main>
    );
  }

  return (
    <NeoFadeIn>
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <Link
          href="/"
          className="neo-btn py-1.5 px-4 text-sm bg-neo-cream inline-flex items-center gap-2 mb-6"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

        <section className="mb-10">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-neo-gray mb-3">
            Mis datos
          </h2>
          <ProfileEditForm profile={profile} onUpdated={setProfile} />
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-neo-gray mb-3">
            Eventos guardados
          </h2>
          <SavedEventsList />
        </section>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => logout()}
            className="neo-btn neo-btn-purple w-full"
          >
            Cerrar Sesión
          </button>
        </div>
      </main>
    </NeoFadeIn>
  );
}
