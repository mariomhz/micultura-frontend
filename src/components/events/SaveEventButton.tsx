"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { isEventSaved, saveEvent, unsaveEvent } from "@/services/users";

interface Props {
  eventoId: number;
}

/**
 * Bookmark-style toggle on the event detail page. For anonymous users it
 * redirects to /login (with ?next= so they come back after auth). For
 * logged-in users it queries the saved state on mount, then optimistically
 * flips on click and rolls back if the API call fails.
 */
export default function SaveEventButton({ eventoId }: Props) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setSaved(false);
      return;
    }
    let cancelled = false;
    isEventSaved(eventoId)
      .then((s) => {
        if (!cancelled) setSaved(s);
      })
      .catch(() => {
        if (!cancelled) setSaved(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated, eventoId]);

  async function handleClick() {
    if (!isAuthenticated) {
      router.push(`/login?next=/events/${eventoId}`);
      return;
    }
    if (pending || saved === null) return;

    const next = !saved;
    setPending(true);
    setSaved(next); // optimistic

    try {
      if (next) {
        await saveEvent(eventoId);
        toast.success("Evento guardado en tu perfil");
      } else {
        await unsaveEvent(eventoId);
        toast.success("Evento eliminado de guardados");
      }
    } catch (err) {
      setSaved(!next); // rollback
      const msg = err instanceof Error ? err.message : "No se pudo actualizar";
      toast.error(msg);
    } finally {
      setPending(false);
    }
  }

  const isOn = saved === true;
  const label = isOn ? "Guardado" : "Guardar";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending || authLoading}
      aria-pressed={isOn}
      aria-label={isOn ? "Quitar de guardados" : "Guardar evento"}
      className={`neo-btn py-2 px-4 text-sm inline-flex items-center gap-2 ${
        isOn ? "bg-neo-yellow text-neo-black" : "bg-white text-neo-black"
      }`}
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill={isOn ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {label}
    </button>
  );
}
