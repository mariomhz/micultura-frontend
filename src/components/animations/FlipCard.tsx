"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function FlipCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotationY: 0 },
        {
          rotationY: 180,
          duration: 0.8,
          ease: "power2.inOut",
          paused: true,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleFlip = () => {
    const target = cardRef.current;
    if (!target) return;

    gsap.to(target, {
      rotationY: flipped ? 0 : 180,
      duration: 0.8,
      ease: "power2.inOut",
    });

    setFlipped(!flipped);
  };

  return (
    <section className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-2xl font-semibold">gsap.fromTo() — Flip Card</h2>
      <div style={{ perspective: 800 }}>
        <div
          ref={cardRef}
          onClick={handleFlip}
          className="flex h-40 w-64 cursor-pointer items-center justify-center rounded-2xl bg-purple-600 text-white text-lg font-medium shadow-lg select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span style={{ backfaceVisibility: "hidden" }}>
            {flipped ? "" : "Click to flip"}
          </span>
          <span
            className="absolute"
            style={{ backfaceVisibility: "hidden", transform: "rotationY(180deg)" }}
          >
            {flipped ? "Flipped!" : ""}
          </span>
        </div>
      </div>
      <p className="text-sm text-zinc-500">Click the card to flip it</p>
    </section>
  );
}
