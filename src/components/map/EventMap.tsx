"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { mockEvents } from "@/data/mockEvents";
import EventMarker from "./EventMarker";

// Tenerife geographic center
const TENERIFE_CENTER: [number, number] = [28.29, -16.62];
const DEFAULT_ZOOM = 10;

export default function EventMap() {
  return (
    <MapContainer
      center={TENERIFE_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}   /* disabled — avoids scroll-hijack on mobile */
      touchZoom={true}
      dragging={true}
      className="neo-map neo-map-container"   /* height responsive via globals.css */
      style={{ width: "100%" }}
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
        {mockEvents.map((event) => (
          <EventMarker key={event.id} event={event} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
