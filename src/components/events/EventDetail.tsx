"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import type { Event } from "@/types";

function formatLongDate(fecha: string, hora: string): string {
  const d = new Date(fecha + "T00:00:00");
  const dateStr = d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // Capitalize weekday
  return dateStr.charAt(0).toUpperCase() + dateStr.slice(1) + " · " + hora;
}

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const { containerRef } = useGSAP(() => {
    // Hero image slides in from top
    gsap.from(".detail-hero", {
      y: -24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
    // Back button + content blocks stagger up
    gsap.from(".detail-block", {
      y: 44,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.25,
    });
  }, []);

  const mapSrc =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${event.longitud - 0.02},${event.latitud - 0.02},` +
    `${event.longitud + 0.02},${event.latitud + 0.02}` +
    `&layer=mapnik&marker=${event.latitud},${event.longitud}`;

  const isFree = event.precio === 0;

  return (
    <div ref={containerRef} className="min-h-screen bg-neo-white">
      {/* ── Back button ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <Link
          href="/events"
          className="detail-block neo-btn neo-btn-yellow inline-flex items-center gap-2 font-black"
          style={{ borderRadius: 0 }}
        >
          ← Volver al catálogo
        </Link>
      </div>

      {/* ── Hero image ────────────────────────────────────────────── */}
      <div
        className="detail-hero relative w-full overflow-hidden"
        style={{
          aspectRatio: "21/9",
          borderTop: "3px solid var(--neo-black)",
          borderBottom: "3px solid var(--neo-black)",
          boxShadow: "0 6px 0 var(--neo-black)",
        }}
      >
        <Image
          src={event.imagenUrl || `https://picsum.photos/seed/event-${event.id}/1200/514`}
          alt={event.titulo}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* ── Content grid ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: main info (2/3) ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Category + title */}
          <div className="detail-block">
            {event.categoria && (
              <span
                className="inline-block mb-3 px-3 py-1 text-sm font-black uppercase"
                style={{ border: "2px solid var(--neo-black)", background: "var(--neo-yellow)" }}
              >
                {event.categoria.icono} {event.categoria.nombre}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-neo-black leading-tight">
              {event.titulo}
            </h1>
          </div>

          {/* Date + Location cards */}
          <div className="detail-block grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="p-4 bg-neo-cream"
              style={{ border: "3px solid var(--neo-black)", boxShadow: "3px 3px 0 var(--neo-black)" }}
            >
              <p className="text-xs font-black uppercase text-neo-gray mb-1 tracking-wider">
                Fecha y hora
              </p>
              <p className="font-bold text-neo-black leading-snug">
                📅 {formatLongDate(event.fecha, event.hora)}
              </p>
            </div>
            <div
              className="p-4 bg-neo-cream"
              style={{ border: "3px solid var(--neo-black)", boxShadow: "3px 3px 0 var(--neo-black)" }}
            >
              <p className="text-xs font-black uppercase text-neo-gray mb-1 tracking-wider">
                Ubicación
              </p>
              <p className="font-bold text-neo-black leading-snug">📍 {event.ubicacion}</p>
            </div>
          </div>

          {/* Description */}
          <div className="detail-block">
            <h2 className="text-xl font-black text-neo-black mb-3 pb-2" style={{ borderBottom: "3px solid var(--neo-black)" }}>
              Sobre el evento
            </h2>
            <p className="text-neo-black leading-relaxed text-base">{event.descripcion}</p>
          </div>

          {/* Map */}
          <div className="detail-block">
            <h2 className="text-xl font-black text-neo-black mb-3 pb-2" style={{ borderBottom: "3px solid var(--neo-black)" }}>
              Cómo llegar
            </h2>
            <div
              className="overflow-hidden"
              style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="300"
                title={`Mapa: ${event.ubicacion}`}
                loading="lazy"
                className="block"
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${event.latitud}&mlon=${event.longitud}&zoom=15`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-bold text-neo-purple underline"
            >
              Abrir en OpenStreetMap →
            </a>
          </div>
        </div>

        {/* ── Right: sidebar (1/3) ──────────────────────────────── */}
        <aside className="space-y-4">
          {/* Price card */}
          <div
            className="detail-block p-6 text-center"
            style={{
              border: "3px solid var(--neo-black)",
              boxShadow: "4px 4px 0 var(--neo-black)",
              background: isFree ? "var(--neo-yellow)" : "var(--neo-purple)",
            }}
          >
            <p
              className="text-xs font-black uppercase tracking-widest mb-1"
              style={{ color: isFree ? "var(--neo-black)" : "white" }}
            >
              Precio
            </p>
            <p
              className="text-5xl font-black"
              style={{ color: isFree ? "var(--neo-black)" : "white" }}
            >
              {isFree ? "Gratis" : `${event.precio} €`}
            </p>
          </div>

          {/* CTA button */}
          {event.enlaceCompra ? (
            <a
              href={event.enlaceCompra}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-block neo-btn neo-btn-purple w-full block text-center py-4 text-lg font-black"
              style={{ borderRadius: 0 }}
            >
              🎟️ Comprar entrada
            </a>
          ) : (
            <div
              className="detail-block py-4 w-full text-center font-black text-lg bg-neo-cream"
              style={{
                border: "3px solid var(--neo-black)",
                boxShadow: "4px 4px 0 var(--neo-black)",
                opacity: 0.7,
              }}
            >
              ✅ Entrada gratuita
            </div>
          )}

          {/* Info box */}
          <div
            className="detail-block p-4 bg-neo-cream"
            style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
          >
            <p className="text-xs font-black uppercase text-neo-gray mb-2 tracking-wider">ℹ️ Información</p>
            <p className="text-sm text-neo-black leading-relaxed">
              {event.enlaceCompra
                ? "Haz clic en Comprar entrada para adquirir tu acceso a través del portal oficial del evento."
                : "Este evento es de acceso gratuito y no requiere entrada. Consulta el lugar para más detalles."}
            </p>
          </div>

          {/* Back link (mobile-friendly duplicate) */}
          <Link
            href="/events"
            className="detail-block block text-center font-bold text-neo-black text-sm py-2 underline underline-offset-2"
          >
            ← Volver al catálogo
          </Link>
        </aside>
      </div>
    </div>
  );
}
