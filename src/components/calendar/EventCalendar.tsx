"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import { useRouter } from "next/navigation";
import { mockEvents, getEventsByDate } from "@/data/mockEvents";
import type { MockEvent } from "@/data/mockEvents";
import EventListPanel from "./EventListPanel";

export default function EventCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [panelEvents, setPanelEvents] = useState<MockEvent[]>([]);

  const fcEvents = mockEvents.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    backgroundColor: e.color,
    borderColor: "#1a1a1a",
    textColor: "#fff",
  }));

  function handleDateClick(info: DateClickArg) {
    const dateStr = info.dateStr;
    setSelectedDate(dateStr);
    setPanelEvents(getEventsByDate(dateStr));
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
