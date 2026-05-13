import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockEvents } from "@/mocks/events";
import { EventDetail } from "@/components/events/EventDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === Number(id));
  if (!event) return { title: "Evento no encontrado" };

  return {
    title: `${event.titulo} — MiCultura Tenerife`,
    description: event.descripcion.slice(0, 155),
  };
}

export function generateStaticParams() {
  return mockEvents.map((e) => ({ id: String(e.id) }));
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === Number(id));

  if (!event) notFound();

  return <EventDetail event={event} />;
}
