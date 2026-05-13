import gsap from "gsap";

/**
 * Creates a GSAP timeline that sequences entrance animations on first page load.
 * Call this inside a useEffect within a client component.
 */
export function createPageLoadTimeline(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo(
    container.querySelector("[data-anim='hero-title']"),
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.6 }
  )
    .fromTo(
      container.querySelector("[data-anim='hero-subtitle']"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      container.querySelector("[data-anim='hero-cta']"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    )
    .fromTo(
      container.querySelectorAll("[data-anim='section']"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
      "-=0.1"
    );

  return tl;
}
