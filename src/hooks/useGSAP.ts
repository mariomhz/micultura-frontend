"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

/**
 * Custom hook that wraps gsap.context() for safe, scoped animations.
 * Automatically cleans up all GSAP animations when the component unmounts.
 *
 * Usage:
 *   const { containerRef, contextSafe } = useGSAP();
 *   // Attach containerRef to a wrapper element
 *   // Use contextSafe() to create event-driven animations
 */
export function useGSAP(callback?: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Don't reference `ctx` from inside the callback — it runs synchronously
    // during the const initialization, so the outer binding is still in TDZ
    // (visible in production as "Cannot access 't' before initialization").
    // GSAP passes the context as `self` to the callback for exactly this case.
    const ctx = gsap.context((self) => {
      callback?.(self);
    }, containerRef);

    ctxRef.current = ctx;

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const contextSafe = useCallback(
    <T extends (...args: unknown[]) => void>(fn: T): T => {
      if (!ctxRef.current) return fn;
      return ctxRef.current.add(fn) as unknown as T;
    },
    []
  );

  return { containerRef, contextSafe };
}
