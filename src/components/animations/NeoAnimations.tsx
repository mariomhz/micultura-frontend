"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * GSAP-powered neobrutalism animation utilities.
 * Use these for richer animations that need timeline control,
 * or fall back to CSS anim-* classes for simple entrance effects.
 */

interface NeoFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function NeoFadeIn({ children, delay = 0, className = "" }: NeoFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

export function NeoSlideIn({ children, delay = 0, className = "", direction = "left" }: NeoFadeProps & { direction?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        x: direction === "left" ? -40 : 40,
        duration: 0.5,
        delay,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, direction]);

  return <div ref={ref} className={className}>{children}</div>;
}

export function NeoScaleUp({ children, delay = 0, className = "" }: NeoFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.5,
        delay,
        ease: "back.out(1.4)",
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

/**
 * Hover lift animation for neo-cards.
 * Attach to interactive elements that need the neobrutalism "press" feel.
 */
export function NeoBounceCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -4,
      boxShadow: "6px 6px 0px var(--neo-black)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 0,
      boxShadow: "4px 4px 0px var(--neo-black)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={ref}
      className={`neo-card ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
