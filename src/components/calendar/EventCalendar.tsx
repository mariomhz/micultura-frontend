"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/useEvents";
import { getCategoryColor } from "@/lib/categoryColors";
import type { Event } from "@/types";
import EventListPanel from "./EventListPanel";

export default function EventCalendar() {
  const router = useRouter();
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [panelEvents, setPanelEvents] = useState<Event[]>([]);

  const fcEvents = events.map((e) => ({
    id: String(e.id),
    title: e.titulo,
    date: e.fecha,
    backgroundColor: getCategoryColor(e.categoria?.nombre),
    borderColor: "#1a1a1a",
    textColor: "#fff",
  }));

  function handleDateClick(info: DateClickArg) {
    const dateStr = info.dateStr;
    setSelectedDate(dateStr);
    setPanelEvents(events.filter((e) => e.fecha === dateStr));
  }

  function handleEventClick(info: EventClickArg) {
    info.jsEvent.preventDefault();
    router.push(`/events/${info.event.id}`);
  }

  function handleClosePanel() {
    setSelectedDate(null);
    setPanelEvents([]);
  }

  return (
    <div>
      <div className="neo-calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          events={fcEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          buttonText={{ today: "Hoy" }}
          height="auto"
          dayMaxEvents={3}
        />
      </div>

      <EventListPanel
        date={selectedDate}
        events={panelEvents}
        onClose={handleClosePanel}
      />
    </div>
  );
}
