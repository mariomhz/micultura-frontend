import { notFound } from "next/navigation";
import { getEventById, mockEvents } from "@/data/mockEvents";
import EventDetail from "@/components/events/EventDetail";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Evento no encontrado — MiCultura" };

  return {
    title: `${event.title} — MiCultura`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
