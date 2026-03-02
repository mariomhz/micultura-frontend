import gsap from "gsap";

export type TransitionType = "fade" | "slide" | "scale";

/**
 * Creates a GSAP timeline that animates a page element into view.
 * Used by PageTransition on mount (route enter).
 */
export function createEnterTimeline(
  element: HTMLElement,
  type: TransitionType = "fade"
) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  switch (type) {
    case "fade":
      tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      break;
    case "slide":
      tl.fromTo(
        element,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7 }
      );
      break;
    case "scale":
      tl.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6 }
      );
      break;
  }

  return tl;
}

/**
 * Creates a GSAP timeline that animates a page element out of view.
 * Can be awaited before programmatic navigation.
 */
export function createExitTimeline(
  element: HTMLElement,
  type: TransitionType = "fade"
) {
  const tl = gsap.timeline({ defaults: { ease: "power3.in" } });

  switch (type) {
    case "fade":
      tl.to(element, { opacity: 0, duration: 0.4 });
      break;
    case "slide":
      tl.to(element, { opacity: 0, y: -40, duration: 0.5 });
      break;
    case "scale":
      tl.to(element, { opacity: 0, scale: 1.05, duration: 0.4 });
      break;
  }

  return tl;
}
