"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "@/types";
import { getCategoryColor } from "@/lib/categoryColors";

interface EventDetailMapProps {
  event: Event;
}

export default function EventDetailMap({ event }: EventDetailMapProps) {
  const color = getCategoryColor(event.categoria?.nombre);
  const emoji = event.categoria?.icono ?? "📍";

  const icon = L.divIcon({
    className: "",
    html: `<div class="neo-marker" style="--marker-color:${color}">
             <div class="neo-marker-inner">${emoji}</div>
           </div>`,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });

  return (
    <MapContainer
      center={[event.latitud, event.longitud]}
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
      <Marker position={[event.latitud, event.longitud]} icon={icon}>
        <Popup>
          <div className="p-2 font-bold text-sm">{event.ubicacion}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
