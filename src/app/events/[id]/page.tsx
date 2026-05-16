import { notFound } from "next/navigation";
import EventDetail from "@/components/events/EventDetail";
import type { Event } from "@/types";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

async function fetchEvent(id: string): Promise<Event | null> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return null;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
    const res = await fetch(`${apiUrl}/api/events/${numericId}`, {
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as Event;
  } catch {
    // API not available — fall through to mock (dev only)
  }

  // Mock data is loaded lazily and only in development builds so it
  // is never bundled into the production output.
  if (process.env.NODE_ENV !== "development") return null;
  const { mockEvents } = await import("@/mocks/events");
  return mockEvents.find((e) => e.id === numericId) ?? null;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { id } = await params;
  const event = await fetchEvent(id);
  if (!event) return { title: "Evento no encontrado — MiCultura" };

  return {
    title: `${event.titulo} — MiCultura`,
    description: event.descripcion,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await fetchEvent(id);

  if (!event) notFound();

  return <EventDetail event={event} />;
}
