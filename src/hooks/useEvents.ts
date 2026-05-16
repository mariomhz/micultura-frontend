"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/types";
import { eventsService, type GetAllParams } from "@/services/events.service";

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
}

export function useEvents(params: GetAllParams = {}): UseEventsResult {
  const [events, setEvents]   = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // Stringify params so the effect re-runs only when values actually change
  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    eventsService
      .getAll(params)
      .then((data) => {
        if (cancelled) return;
        setEvents(data.content ?? []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg =
          err instanceof Error ? err.message : "Error al cargar los eventos";
        setError(msg);
        setEvents([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { events, loading, error };
}
