"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * Full-screen color wipe overlay that plays on route changes.
 * Lives in layout.tsx so it persists across navigations.
 * On first render it stays hidden; on subsequent pathname changes it
 * slides in then out to create a wipe transition effect.
 */
export default function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!overlayRef.current) return;

    setDisplayed(true);

    const tl = gsap.timeline({
      onComplete: () => setDisplayed(false),
    });

    tl.fromTo(
      overlayRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.4, ease: "power3.inOut" }
    ).to(overlayRef.current, {
      yPercent: 100,
      duration: 0.4,
      ease: "power3.inOut",
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{ display: displayed ? "block" : "none" }}
      className="fixed inset-0 z-50 bg-foreground pointer-events-none"
    />
  );
}
