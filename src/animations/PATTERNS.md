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

## Page Transitions

Page transitions use GSAP + Next.js App Router's `template.tsx` (which re-mounts on every navigation).

### Architecture

- **`template.tsx`** — wraps children in `<PageTransition>`. Re-mounts per route, triggering the enter animation.
- **`PageTransition`** (`src/components/transitions/PageTransition.tsx`) — plays `createEnterTimeline()` on mount, scrolls to top on pathname change.
- **`TransitionOverlay`** (`src/components/transitions/TransitionOverlay.tsx`) — full-screen color wipe in `layout.tsx` (persists across navigations). Skips on first render, then animates `yPercent` in/out on pathname change.
- **`pageTransitions.ts`** (`src/animations/pageTransitions.ts`) — exports `createEnterTimeline(element, type)` and `createExitTimeline(element, type)`.

### Transition Types

| Type    | Enter Effect              | Exit Effect                |
|---------|---------------------------|----------------------------|
| `fade`  | Opacity 0 → 1            | Opacity 1 → 0             |
| `slide` | Opacity 0 + y:60 → origin | Opacity 1 → 0, y → -40   |
| `scale` | Opacity 0 + scale:0.95   | Opacity 1 → 0, scale:1.05 |

### Layering with PageLoadWrapper

The home page uses `PageLoadWrapper` for its internal element sequencing (hero title, subtitle, sections). This layers on top of the page transition — `PageTransition` animates the whole page container, then `PageLoadWrapper` sequences individual elements within.

## Neobrutalism Design System

### CSS Variables (defined in `globals.css`)

| Variable             | Color   | Use case                  |
|----------------------|---------|---------------------------|
| `--neo-purple`       | #7c3aed | Primary / accent          |
| `--neo-gold`         | #d97706 | Secondary / warm accent   |
| `--neo-yellow`       | #facc15 | Highlight / attention     |
| `--neo-lilac`        | #c4b5fd | Soft background / tags    |
| `--neo-black`        | #1a1a1a | Borders, shadows, text    |
| `--neo-white`        | #fffbeb | Warm white background     |
| `--neo-cream`        | #fef3c7 | Card backgrounds          |

Each color has a `-light` variant (e.g. `--neo-purple-light`). All are registered in `@theme inline` so Tailwind classes work: `bg-neo-purple`, `text-neo-gold`, etc.

### CSS Helper Classes

| Class             | What it does                                      |
|-------------------|---------------------------------------------------|
| `.neo-card`       | Border + hard shadow + hover press effect         |
| `.neo-btn`        | Bold button with shadow + active press            |
| `.neo-btn-purple` | Purple variant (also: `-yellow`, `-gold`, `-lilac`) |
| `.neo-tag`        | Small pill badge with shadow                      |
| `.neo-input`      | Input field with hard shadow + focus glow         |
| `.neo-divider`    | Thick border divider line                         |

### Animation Utilities

**CSS classes** (no GSAP needed — good for Navbar items):

| Class              | Effect              |
|--------------------|---------------------|
| `.anim-fade-in`    | Fade + slide up     |
| `.anim-slide-left` | Slide from left     |
| `.anim-slide-right`| Slide from right    |
| `.anim-scale-up`   | Scale from 90%      |
| `.anim-delay-1..5` | Stagger delays      |

**GSAP components** (`src/components/animations/NeoAnimations.tsx`):

| Component       | Effect                          | Props                        |
|-----------------|---------------------------------|------------------------------|
| `<NeoFadeIn>`   | Fade + slide up with GSAP       | `delay`, `className`         |
| `<NeoSlideIn>`  | Slide from left/right with GSAP | `delay`, `direction`, `className` |
| `<NeoScaleUp>`  | Scale up with back-ease         | `delay`, `className`         |
| `<NeoBounceCard>` | Hover lift on neo-cards       | `className`                  |

### For Raquel's Navbar

The Navbar can use CSS animation classes directly without importing GSAP:

```tsx
<nav>
  <a className="anim-fade-in anim-delay-1">Home</a>
  <a className="anim-fade-in anim-delay-2">About</a>
  <a className="anim-fade-in anim-delay-3">Work</a>
</nav>
```

Or wrap items in GSAP components for richer control:

```tsx
<NeoSlideIn delay={0.1} direction="left">
  <a className="neo-btn neo-btn-purple">Home</a>
</NeoSlideIn>
```

## Best Practices

1. Always use `gsap.context()` (or the `useGSAP` hook) for cleanup.
2. Return `ctx.revert()` in `useEffect` cleanup to kill all animations.
3. Scope animations to a container ref to avoid leaking between components.
4. Use `data-*` attributes or class selectors inside the scoped container.
5. Register plugins (`ScrollTrigger`, `Flip`, etc.) at module level, not inside effects.
