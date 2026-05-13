"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import type { Event } from "@/types";

interface ShareButtonsProps {
  event: Event;
}

export function ShareButtons({ event }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const copiedRef = useRef<HTMLSpanElement>(null);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${event.titulo} — ${event.fecha} en ${event.ubicacion}`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: event.titulo, text, url });
      } catch {
        // User cancelled sharing
      }
    }
  }

  function handleWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedRef.current) {
        gsap.fromTo(
          copiedRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }
        );
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="detail-block">
      <h2
        className="text-xl font-black text-neo-black mb-3 pb-2"
        style={{ borderBottom: "3px solid var(--neo-black)" }}
      >
        Compartir evento
      </h2>
      <div className="flex flex-wrap gap-3">
        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="neo-btn py-2 px-4 text-sm font-black"
          style={{ borderRadius: 0, background: "#25D366", color: "white" }}
          aria-label="Compartir en WhatsApp"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </button>

        {/* Twitter/X */}
        <button
          onClick={handleTwitter}
          className="neo-btn py-2 px-4 text-sm font-black"
          style={{ borderRadius: 0, background: "var(--neo-black)", color: "white" }}
          aria-label="Compartir en X"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="neo-btn py-2 px-4 text-sm font-black relative bg-neo-cream"
          style={{ borderRadius: 0 }}
          aria-label="Copiar enlace"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.81" />
          </svg>
          {copied ? (
            <span ref={copiedRef} className="font-black" style={{ color: "var(--neo-purple)" }}>
              ¡Copiado!
            </span>
          ) : (
            "Copiar enlace"
          )}
        </button>

        {/* Native Share (mobile) */}
        {canNativeShare && (
          <button
            onClick={handleShare}
            className="neo-btn neo-btn-purple py-2 px-4 text-sm font-black"
            style={{ borderRadius: 0 }}
            aria-label="Compartir"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Compartir
          </button>
        )}
      </div>
    </div>
  );
}
