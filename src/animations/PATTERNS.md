# GSAP Animation Patterns

## "use client" Requirement

GSAP runs in the browser only. **Every** file that imports `gsap` must have the `"use client"` directive at the top. Server Components can still import client animation components normally.

## Hook: `useGSAP`

Located at `src/hooks/useGSAP.ts`. Wraps `gsap.context()` so all animations created inside are automatically cleaned up on unmount.

```tsx
const { containerRef, contextSafe } = useGSAP(() => {
  gsap.from(".box", { opacity: 0, y: 20 });
});
// Attach containerRef to the wrapper <div>
```

### `contextSafe` for event handlers

Use `contextSafe` to wrap click/hover handlers that create animations, ensuring they are part of the GSAP context:

```tsx
const onClick = contextSafe(() => {
  gsap.to(".box", { rotation: 360 });
});
```

## Timeline (page load)

`src/animations/pageLoadTimeline.ts` exports `createPageLoadTimeline(container)`.

- Uses `data-anim` attributes to target elements.
- Sequences entrance animations with stagger and overlap (`"-=0.4"`).
- Consumed by `PageLoadWrapper`, a client component that runs the timeline in `useEffect`.

## ScrollTrigger

Register the plugin **once** at module level:

```tsx
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

Key options demonstrated in `ScrollReveal.tsx`:

| Option          | Example              | Purpose                           |
|-----------------|----------------------|-----------------------------------|
| `trigger`       | the element itself   | Element that triggers the anim    |
| `start`         | `"top 85%"`          | When trigger top hits 85% of VP   |
| `end`           | `"top 40%"`          | When trigger top hits 40% of VP   |
| `scrub`         | `1`                  | Smooth scrub tied to scroll pos   |
| `toggleActions` | `"play none none reverse"` | Actions on enter/leave/etc. |

## Component Structure

All animation components live in `src/components/animations/`:

| Component          | Technique           | GSAP Method     |
|--------------------|---------------------|-----------------|
| `FadeIn.tsx`       | Fade + slide in     | `gsap.from()`   |
| `ScaleUp.tsx`      | Elastic scale pulse | `gsap.to()`     |
| `FlipCard.tsx`     | 3D card flip        | `gsap.fromTo()` |
| `ScrollReveal.tsx` | Scroll-based reveal | ScrollTrigger   |
| `PageLoadWrapper`  | Sequenced entrance  | `gsap.timeline` |

## Best Practices

1. Always use `gsap.context()` (or the `useGSAP` hook) for cleanup.
2. Return `ctx.revert()` in `useEffect` cleanup to kill all animations.
3. Scope animations to a container ref to avoid leaking between components.
4. Use `data-*` attributes or class selectors inside the scoped container.
5. Register plugins (`ScrollTrigger`, `Flip`, etc.) at module level, not inside effects.
