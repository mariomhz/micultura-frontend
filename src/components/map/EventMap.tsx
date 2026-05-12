"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PR_CENTER: [number, number] = [18.22, -66.59];
const PR_ZOOM = 9;

export default function EventMap() {
  return (
    <MapContainer
      center={PR_CENTER}
      zoom={PR_ZOOM}
      scrollWheelZoom={true}
      className="neo-map"
      style={{ height: "480px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
