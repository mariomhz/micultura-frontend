"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { Event } from "@/types";
import { getCategoryColor, formatPrice } from "@/lib/categoryColors";
import TicketSelector from "./TicketSelector";
import ShareButtons from "./ShareButtons";

const EventDetailMap = dynamic(() => import("./EventDetailMap"), {
  ssr: false,
  loading: () => (
    <div
      className="neo-card flex items-center justify-center"
      style={{ height: "240px" }}
    >
      <p className="text-neo-gray font-bold animate-pulse">Cargando mapa...</p>
    </div>
  ),
});

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const color    = getCategoryColor(event.categoria?.nombre);
  const emoji    = event.categoria?.icono ?? "📍";
  const isFree   = event.precio === 0;
  const price    = formatPrice(event.precio);

  const dateFormatted = new Date(event.fecha + "T00:00:00").toLocaleDateString(
    "es-ES",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        "[data-anim='detail-badge']",
        { opacity: 0, y: -15, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 }
      )
        .fromTo(
          "[data-anim='detail-title']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          "[data-anim='detail-meta']",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          "[data-anim='detail-hero-price']",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3 },
          "-=0.2"
        );

      tl.fromTo(
        "[data-anim='detail-section']",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        "-=0.1"
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!heroRef.current) return;
      const scrollY    = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroRef.current.style.opacity   = `${1 - progress * 0.4}`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-neo-white">
      {/* ===== Back Nav ===== */}
      <nav className="sticky top-0 z-50 bg-neo-white border-b-3 border-neo-black px-6 py-3 flex items-center justify-between">
        <Link href="/" className="neo-btn py-1.5 px-4 text-sm bg-neo-cream font-body">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver
        </Link>
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          MiCultura
        </Link>
        <div className="w-[100px]" />
      </nav>

      {/* ===== Hero Image ===== */}
      <div className="relative overflow-hidden" style={{ height: "clamp(280px, 45vh, 480px)" }}>
        <div ref={heroRef} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imagenUrl}
            alt={event.titulo}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${color}10 0%, ${color}70 50%, ${color}ee 100%)`,
            }}
          />
        </div>

        <div className="hero-shape hero-shape-1 opacity-40" />
        <div className="hero-shape hero-shape-2 opacity-40" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 mx-auto max-w-6xl">
          <span
            data-anim="detail-badge"
            className="neo-tag text-xs mb-4 w-fit"
            style={{ backgroundColor: "white", color }}
          >
            {emoji} {event.categoria?.nombre}
          </span>
          <h1
            data-anim="detail-title"
            className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
          >
            {event.titulo}
          </h1>
          <div
            data-anim="detail-meta"
            className="flex flex-wrap items-center gap-4 mt-4 text-white/90 font-body text-sm"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="capitalize">{dateFormatted}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.hora}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {event.ubicacion}
            </span>
          </div>
          <div data-anim="detail-hero-price" className="mt-4">
            <span
              className="neo-tag text-sm"
              style={{
                backgroundColor: isFree ? "#059669" : "var(--neo-yellow)",
                color: isFree ? "#fff" : "var(--neo-black)",
              }}
            >
              {price}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div ref={contentRef} className="px-6 py-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div data-anim="detail-section">
              <h2 className="font-heading text-xl font-bold mb-3">Sobre el evento</h2>
              <p className="font-body text-base leading-relaxed text-foreground/80">
                {event.descripcion}
              </p>
            </div>

            {/* Date & Time */}
            <div data-anim="detail-section" className="neo-card p-5 hover:transform-none hover:shadow-[var(--neo-shadow)]">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-neo-gray mb-4">
                Fecha y hora
              </h3>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl border-3 border-neo-black flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: color + "15" }}
                >
                  <span className="font-heading text-2xl font-bold leading-none" style={{ color }}>
                    {new Date(event.fecha + "T00:00:00").getDate()}
                  </span>
                  <span className="font-body text-[10px] font-bold uppercase text-neo-gray">
                    {new Date(event.fecha + "T00:00:00").toLocaleDateString("es-ES", { month: "short" })}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold capitalize">{dateFormatted}</p>
                  <p className="font-body text-sm text-neo-gray mt-1">{event.hora}</p>
                </div>
              </div>
            </div>

            {/* Location + Map */}
            <div data-anim="detail-section">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-neo-gray mb-4">
                Ubicación
              </h3>
              <div className="neo-card overflow-hidden hover:transform-none hover:shadow-[var(--neo-shadow)]">
                <EventDetailMap event={event} />
                <div className="p-4 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-neo-black flex items-center justify-center"
                    style={{ backgroundColor: color + "20" }}
                  >
                    📍
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm">{event.ubicacion}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${event.latitud},${event.longitud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs underline hover:opacity-70"
                      style={{ color }}
                    >
                      Abrir en Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Share */}
            <div data-anim="detail-section">
              <ShareButtons event={event} />
            </div>
          </div>

          {/* Right column: Ticket */}
          <div className="lg:col-span-1">
            <div data-anim="detail-section" className="lg:sticky lg:top-20">
              <TicketSelector event={event} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Footer mini ===== */}
      <footer className="bg-neo-black text-white px-6 py-8 mt-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-heading text-lg font-bold hover:text-neo-yellow transition-colors">
            MiCultura
          </Link>
          <p className="text-xs text-gray-500 font-body">
            &copy; {new Date().getFullYear()} MiCultura. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
