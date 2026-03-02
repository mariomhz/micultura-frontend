"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ScaleUp() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        scale: 1.2,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
        repeat: -1,
        yoyo: true,
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-2xl font-semibold">gsap.to() — Scale Up</h2>
      <div
        ref={boxRef}
        className="flex h-40 w-64 items-center justify-center rounded-2xl bg-emerald-600 text-white text-lg font-medium shadow-lg"
      >
        Scale Pulse
      </div>
    </section>
  );
}
