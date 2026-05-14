/**
 * EventSkeleton — shown while events are loading.
 * Uses the neo-shimmer animation (cream→yellow gradient sweep) so it
 * feels native to the design system instead of generic gray pulses.
 */
export function EventSkeleton() {
  return (
    <div
      className="overflow-hidden"
      style={{
        border: "3px solid var(--neo-black)",
        boxShadow: "4px 4px 0 var(--neo-black)",
        background: "var(--neo-cream)",
      }}
    >
      {/* Image placeholder */}
      <div
        className="neo-shimmer"
        style={{ aspectRatio: "16/9", borderBottom: "3px solid var(--neo-black)" }}
      />

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        {/* Category badge */}
        <div
          className="neo-shimmer h-5 w-24"
          style={{ border: "2px solid var(--neo-black)" }}
        />
        {/* Title — two lines */}
        <div className="neo-shimmer h-6 w-full" />
        <div className="neo-shimmer h-6 w-3/4" />
        {/* Date */}
        <div className="neo-shimmer h-4 w-2/3" />
        {/* Location */}
        <div className="neo-shimmer h-4 w-1/2" />
        {/* Price row */}
        <div className="mt-1 flex items-center justify-between">
          <div
            className="neo-shimmer h-8 w-20"
            style={{ border: "2px solid var(--neo-black)" }}
          />
          <div className="neo-shimmer h-4 w-14" />
        </div>
      </div>
    </div>
  );
}
