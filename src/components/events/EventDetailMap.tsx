"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MockEvent } from "@/data/mockEvents";

const categoryEmoji: Record<string, string> = {
  Festival: "🎉",
  Arte: "🎨",
  Música: "🎶",
  Taller: "🛠️",
  Feria: "🎪",
  Historia: "🏛️",
  Cine: "🎬",
  Gastronomía: "🍝",
  Teatro: "🎭",
  Bienestar: "🧘",
};

function createIcon(event: MockEvent) {
  const emoji = categoryEmoji[event.category] || "📍";
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

interface EventDetailMapProps {
  event: MockEvent;
}

export default function EventDetailMap({ event }: EventDetailMapProps) {
  return (
    <MapContainer
      center={[event.location.lat, event.location.lng]}
      zoom={15}
      scrollWheelZoom={false}
      dragging={false}
      className="neo-map"
      style={{ height: "240px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[event.location.lat, event.location.lng]}
        icon={createIcon(event)}
      >
        <Popup>
          <div className="p-2 font-bold text-sm">{event.location.name}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
