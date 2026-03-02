"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  createEnterTimeline,
  type TransitionType,
} from "@/animations/pageTransitions";

interface PageTransitionProps {
  children: React.ReactNode;
  type?: TransitionType;
}

/**
 * Wraps page content and plays a GSAP enter animation on mount.
 * Because template.tsx re-mounts on every navigation, this component
 * triggers the enter animation each time the route changes.
 */
export default function PageTransition({
  children,
  type = "slide",
}: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createEnterTimeline(containerRef.current, type);

    return () => {
      tl.revert();
    };
  }, [type, pathname]);

  return <div ref={containerRef}>{children}</div>;
}
