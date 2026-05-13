import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Event } from "@/types";
import { mockEvents } from "@/mocks/events";
import { eventsService } from "@/services/events.service";
import { EventDetail } from "@/components/events/EventDetail";

interface Props {
  params: Promise<{ id: string }>;
}

async function getEvent(id: number): Promise<Event | null> {
  try {
    return await eventsService.getById(id);
  } catch {
    // API unavailable — fall back to mock data
    return mockEvents.find((e) => e.id === id) ?? null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(Number(id));
  if (!event) return { title: "Evento no encontrado" };

  return {
    title: `${event.titulo} — MiCultura Tenerife`,
    description: event.descripcion.slice(0, 155),
    openGraph: {
      title: event.titulo,
      description: event.descripcion.slice(0, 155),
      images: event.imagenUrl ? [{ url: event.imagenUrl }] : [],
    },
  };
}

export function generateStaticParams() {
  return mockEvents.map((e) => ({ id: String(e.id) }));
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(Number(id));

  if (!event) notFound();

  return <EventDetail event={event} />;
}
