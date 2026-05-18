"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero backdrop: a giant outlined CULTURA wordmark stretched across the
 * section + two halftone dot accents in opposite corners.
 *
 * The wordmark sits behind the title (z-index 0 vs the title's z-10) and
 * drifts subtly with the cursor for parallax depth. Halftone dots are masked
 * with a radial fade so they feel organic rather than rectangular.
 */
export default function HeroShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bgWrap = container.querySelector<HTMLElement>("[data-bg-wrap]");
    if (!bgWrap) return;

    const setX = gsap.quickTo(bgWrap, "x", { duration: 1.6, ease: "power2.out" });
    const setY = gsap.quickTo(bgWrap, "y", { duration: 1.6, ease: "power2.out" });

    function onPointerMove(e: PointerEvent) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w - 0.5) * 2;
      const ny = (e.clientY / h - 0.5) * 2;
      setX(-nx * 14);
      setY(-ny * 8);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="hero-shapes-container">
      <div className="hero-bg-stage">
        <div data-bg-wrap className="hero-bg-wrap">
          <span className="hero-bg-text">TENERIFE</span>
        </div>
      </div>

      <div className="hero-dots hero-dots-tl" />
      <div className="hero-dots hero-dots-br" />
    </div>
  );
}
