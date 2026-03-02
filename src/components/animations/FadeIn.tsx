"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FadeIn() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-2xl font-semibold">gsap.from() — Fade In</h2>
      <div
        ref={boxRef}
        className="flex h-40 w-64 items-center justify-center rounded-2xl bg-blue-600 text-white text-lg font-medium shadow-lg"
      >
        Fade + Slide In
      </div>
    </section>
  );
}
