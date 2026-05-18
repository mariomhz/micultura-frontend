"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useEvents } from "@/hooks/useEvents";
import EventMarker from "./EventMarker";

const TENERIFE_CENTER: [number, number] = [28.29, -16.52];
const TENERIFE_ZOOM = 10;

export default function EventMap() {
  // Pull the full catalog so every event renders a pin, not just the next
  // ~20 chronological events the default page size returns.
  const { events } = useEvents({ size: 100 });

  return (
    <MapContainer
      center={TENERIFE_CENTER}
      zoom={TENERIFE_ZOOM}
      scrollWheelZoom={false}
      touchZoom={true}
      dragging={true}
      className="neo-map"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster: { getChildCount: () => number }) => {
          const L = require("leaflet");
          const count = cluster.getChildCount();
          return L.divIcon({
            className: "",
            html: `<div class="neo-cluster">${count}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });
        }}
      >
        {events
          .filter((e) => e.latitud != null && e.longitud != null)
          .map((event) => (
            <EventMarker key={event.id} event={event} />
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
