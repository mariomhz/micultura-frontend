"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>(".scroll-box");

      boxes.forEach((box) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-center gap-8 py-16">
      <h2 className="text-2xl font-semibold">ScrollTrigger — Scroll Reveal</h2>
      <p className="text-zinc-500">Scroll down to reveal cards (scrub enabled)</p>

      <div className="flex flex-col gap-12 w-full max-w-md">
        {["#f43f5e", "#8b5cf6", "#06b6d4", "#f59e0b"].map((color, i) => (
          <div
            key={i}
            className="scroll-box flex h-32 items-center justify-center rounded-2xl text-white text-lg font-medium shadow-lg"
            style={{ backgroundColor: color }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
