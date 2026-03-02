import gsap from "gsap";

/**
 * Creates a GSAP timeline that sequences entrance animations on first page load.
 * Call this inside a useEffect within a client component.
 */
export function createPageLoadTimeline(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(container.querySelector("[data-anim='hero-title']"), {
    opacity: 0,
    y: -30,
    duration: 0.8,
  })
    .from(
      container.querySelector("[data-anim='hero-subtitle']"),
      { opacity: 0, y: 20, duration: 0.6 },
      "-=0.4"
    )
    .from(
      container.querySelectorAll("[data-anim='section']"),
      { opacity: 0, y: 30, duration: 0.6, stagger: 0.15 },
      "-=0.2"
    );

  return tl;
}
