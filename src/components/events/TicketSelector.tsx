"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import type { Event } from "@/types";
import { getCategoryColor, formatPrice } from "@/lib/categoryColors";

interface TicketSelectorProps {
  event: Event;
}

export default function TicketSelector({ event }: TicketSelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const priceRef = useRef<HTMLSpanElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  const color  = getCategoryColor(event.categoria?.nombre);
  const isFree = event.precio === 0;
  const total  = event.precio * quantity;

  useEffect(() => {
    if (priceRef.current) {
      gsap.fromTo(
        priceRef.current,
        { scale: 1.3, color },
        { scale: 1, color: "var(--neo-black)", duration: 0.3, ease: "back.out(2)" }
      );
    }
  }, [quantity, color]);

  function handleBuy() {
    const url = event.enlaceCompra;
    if (!url) return;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.97,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.open(url, "_blank", "noopener,noreferrer");
        },
      });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div ref={cardRef} className="neo-card p-6 hover:transform-none hover:shadow-[var(--neo-shadow)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-lg border-2 border-neo-black flex items-center justify-center text-lg"
          style={{ backgroundColor: color + "20" }}
        >
          🎟️
        </div>
        <div>
          <h3 className="font-heading text-base font-bold">Entradas</h3>
          <p className="text-xs text-neo-gray font-body">
            {isFree ? "Evento gratuito" : `${event.precio}€ por entrada`}
          </p>
        </div>
      </div>

      {/* Quantity selector */}
      {!isFree && (
        <div className="mb-5">
          <label className="text-sm font-bold font-body block mb-2">Cantidad</label>
          <div className="flex items-center gap-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="neo-btn py-2 px-4 rounded-r-none bg-neo-cream text-lg font-bold"
              aria-label="Reducir cantidad"
            >
              -
            </button>
            <div className="w-16 h-[46px] border-y-[3px] border-neo-black bg-white flex items-center justify-center font-heading font-bold text-lg">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="neo-btn py-2 px-4 rounded-l-none text-lg font-bold"
              style={{ backgroundColor: color, color: "#fff" }}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between py-3 mb-5 border-t-2 border-b-2 border-neo-black/10">
        <span className="font-body font-semibold text-sm">Total</span>
        <span ref={priceRef} className="font-heading text-2xl font-bold">
          {isFree ? "Gratis" : `${total.toFixed(2)}€`}
        </span>
      </div>

      {/* Buy button */}
      {event.enlaceCompra ? (
        <button
          onClick={handleBuy}
          className="neo-btn w-full py-3.5 text-base font-bold justify-center"
          style={{ backgroundColor: color, color: "#fff" }}
        >
          {isFree ? "Reservar entrada" : "Comprar entrada"}
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      ) : (
        <div className="neo-card bg-neo-cream p-4 text-center hover:transform-none hover:shadow-[var(--neo-shadow)]">
          <p className="font-bold text-sm font-body">Entrada libre</p>
          <p className="text-xs text-neo-gray mt-1 font-body">
            No necesitas reservar, solo preséntate en el evento
          </p>
        </div>
      )}
    </div>
  );
}
