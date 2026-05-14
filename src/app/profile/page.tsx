"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMe, type MeResponse } from "@/services/users";
import { NeoFadeIn } from "@/components/animations/NeoAnimations";

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

  if (error) {
    return (
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="neo-card bg-red-100 border-red-400 p-4 text-red-700">
          {error}
        </div>
      </main>
    );
  }

  return (
    <NeoFadeIn>
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

        <div className="neo-card p-8 space-y-5">
          <ProfileField label="Nombre" value={profile?.nombre} />
          <ProfileField label="Email" value={profile?.email} />
          <ProfileField label="Rol" value={profile?.rol} />
          <ProfileField
            label="Fecha de registro"
            value={profile ? formatDate(profile.createdAt) : undefined}
          />

          <div className="pt-4 border-t-2 border-black">
            <button
              type="button"
              onClick={() => logout()}
              className="neo-btn neo-btn-purple w-full"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </NeoFadeIn>
  );
}

function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="text-lg font-medium">{value ?? "—"}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
