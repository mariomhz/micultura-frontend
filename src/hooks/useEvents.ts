"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/types";
import { eventsService, type EventsParams } from "@/services/events.service";
import { isFallbackActive } from "@/lib/fallbackData";
import { mockEvents } from "@/mocks/events";

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
  usingMock: boolean;
}

export function useEvents(params: EventsParams = {}): UseEventsResult {
  const [events, setEvents]     = useState<Event[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);

  // Stringify so the effect only re-runs when values actually change
  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setUsingMock(false);

    // Explicit mock mode — set NEXT_PUBLIC_USE_MOCKS=true in .env.local
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
      const filtered =
        params.category != null
          ? mockEvents.filter((e) => e.categoria.id === params.category)
          : mockEvents;
      setEvents(filtered);
      setUsingMock(true);
      setLoading(false);
      return;
    }

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

  return { events, loading, error, usingMock };
}
