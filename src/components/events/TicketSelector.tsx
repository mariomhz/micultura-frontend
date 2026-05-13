"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import type { Event } from "@/types";

interface TicketSelectorProps {
  event: Event;
}

export function TicketSelector({ event }: TicketSelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const priceRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isFree = event.precio === 0;
  const total = event.precio * quantity;

  useEffect(() => {
    if (priceRef.current) {
      gsap.fromTo(
        priceRef.current,
        { scale: 1.3, color: "var(--neo-purple)" },
        { scale: 1, color: "var(--neo-black)", duration: 0.3, ease: "back.out(2)" }
      );
    }
  }, [quantity]);

  function handleBuy() {
    if (!event.enlaceCompra) return;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.97,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.open(event.enlaceCompra, "_blank", "noopener,noreferrer");
        },
      });
    } else {
      window.open(event.enlaceCompra, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div
      ref={cardRef}
      className="detail-block p-6"
      style={{
        border: "3px solid var(--neo-black)",
        boxShadow: "4px 4px 0 var(--neo-black)",
        background: "var(--neo-white)",
      }}
    >
      {/* Price display */}
      <div
        className="p-5 text-center mb-5"
        style={{
          border: "3px solid var(--neo-black)",
          boxShadow: "3px 3px 0 var(--neo-black)",
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

      {/* Quantity selector */}
      {!isFree && (
        <div className="mb-5">
          <p className="text-xs font-black uppercase text-neo-gray mb-2 tracking-wider">
            Cantidad de entradas
          </p>
          <div className="flex items-center gap-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="neo-btn py-2 px-4 bg-neo-cream font-black text-lg"
              style={{ borderRadius: 0, borderRight: "none" }}
              aria-label="Reducir cantidad"
            >
              −
            </button>
            <div
              className="w-16 h-[46px] flex items-center justify-center font-black text-lg bg-white"
              style={{ borderTop: "3px solid var(--neo-black)", borderBottom: "3px solid var(--neo-black)" }}
            >
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="neo-btn neo-btn-purple py-2 px-4 font-black text-lg"
              style={{ borderRadius: 0, borderLeft: "none" }}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      {!isFree && (
        <div
          className="flex items-center justify-between py-3 mb-5"
          style={{ borderTop: "3px solid var(--neo-black)", borderBottom: "3px solid var(--neo-black)" }}
        >
          <span className="font-bold text-sm">Total</span>
          <span ref={priceRef} className="text-2xl font-black">
            {total.toFixed(2)} €
          </span>
        </div>
      )}

      {/* Buy button */}
      {event.enlaceCompra ? (
        <button
          onClick={handleBuy}
          className="neo-btn neo-btn-purple w-full py-4 text-lg font-black justify-center"
          style={{ borderRadius: 0 }}
        >
          🎟️ {isFree ? "Reservar entrada" : "Comprar entrada"}
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      ) : (
        <div
          className="py-4 w-full text-center font-black text-lg bg-neo-cream"
          style={{
            border: "3px solid var(--neo-black)",
            boxShadow: "4px 4px 0 var(--neo-black)",
          }}
        >
          ✅ Entrada gratuita
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-neo-gray mt-4 leading-relaxed">
        {event.enlaceCompra
          ? "Serás redirigido al portal oficial del evento para completar la compra."
          : "Este evento es de acceso libre. No necesitas reservar."}
      </p>
    </div>
  );
}
