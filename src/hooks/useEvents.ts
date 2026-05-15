"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/types";
import { eventsService } from "@/services/events.service";
import { mockEvents } from "@/mocks/events";

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
  usingMock: boolean;
}

export function useEvents(categoryId?: number | null): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setUsingMock(false);

    const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

    if (useMocks) {
      const filtered =
        categoryId != null
          ? mockEvents.filter((e) => e.categoriaId === categoryId)
          : mockEvents;
      setEvents(filtered);
      setUsingMock(true);
      setLoading(false);
      return;
    }

    eventsService
      .getAll(categoryId != null ? { category: categoryId } : {})
      .then((data) => {
        if (cancelled) return;
        setEvents(data.content);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        const filtered =
          categoryId != null
            ? mockEvents.filter((e) => e.categoriaId === categoryId)
            : mockEvents;
        setEvents(filtered);
        setUsingMock(true);
        setLoading(false);
        setError("API no disponible — mostrando datos de ejemplo");
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return { events, loading, error, usingMock };
}
