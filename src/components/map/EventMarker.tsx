"use client";

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import type { MockEvent } from "@/data/mockEvents";
import EventPopup from "./EventPopup";

const categoryEmoji: Record<string, string> = {
  Festival: "\uD83C\uDF89",
  Arte: "\uD83C\uDFA8",
  "Música": "\uD83C\uDFB6",
  Taller: "\uD83D\uDEE0\uFE0F",
  Feria: "\uD83C\uDFAA",
  Historia: "\uD83C\uDFDB\uFE0F",
  Cine: "\uD83C\uDFAC",
  "Gastronomía": "\uD83C\uDF7D\uFE0F",
  Teatro: "\uD83C\uDFAD",
  Bienestar: "\uD83E\uDDD8",
};

function createNeoIcon(event: MockEvent) {
  const emoji = categoryEmoji[event.category] || "\uD83D\uDCCD";
  return L.divIcon({
    className: "",
    html: `
      <div class="neo-marker" style="--marker-color: ${event.color}">
        <div class="neo-marker-inner">${emoji}</div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });
}

interface EventMarkerProps {
  event: MockEvent;
}

export default function EventMarker({ event }: EventMarkerProps) {
  return (
    <Marker
      position={[event.location.lat, event.location.lng]}
      icon={createNeoIcon(event)}
    >
      <Popup>
        <EventPopup event={event} />
      </Popup>
    </Marker>
  );
}
