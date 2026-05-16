"use client";

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import type { Event } from "@/types";
import { getCategoryColor } from "@/lib/categoryColors";
import EventPopup from "./EventPopup";

function createNeoIcon(event: Event) {
  const color = getCategoryColor(event.categoria?.nombre);
  const emoji = event.categoria?.icono ?? "📍";
  return L.divIcon({
    className: "",
    html: `
      <div class="neo-marker" style="--marker-color: ${color}">
        <div class="neo-marker-inner">${emoji}</div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });
}

interface EventMarkerProps {
  event: Event;
}

export default function EventMarker({ event }: EventMarkerProps) {
  return (
    <Marker
      position={[event.latitud, event.longitud]}
      icon={createNeoIcon(event)}
    >
      <Popup>
        <EventPopup event={event} />
      </Popup>
    </Marker>
  );
}
