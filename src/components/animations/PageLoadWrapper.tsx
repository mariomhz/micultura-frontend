"use client";

import { useRef, useEffect } from "react";
import { createPageLoadTimeline } from "@/animations/pageLoadTimeline";

export default function PageLoadWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = createPageLoadTimeline(containerRef.current);
    return () => {
      tl.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
