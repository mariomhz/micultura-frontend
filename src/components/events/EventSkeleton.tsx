export function EventSkeleton() {
  return (
    <div
      className="overflow-hidden bg-neo-cream animate-pulse"
      style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
    >
      {/* Image placeholder */}
      <div className="bg-gray-300" style={{ aspectRatio: "16/9", borderBottom: "3px solid var(--neo-black)" }} />

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-1/3 bg-gray-300" />
        <div className="h-6 w-full bg-gray-300" />
        <div className="h-4 w-2/3 bg-gray-300" />
        <div className="h-4 w-1/2 bg-gray-300" />
        <div className="mt-1 flex items-center justify-between">
          <div className="h-7 w-16 bg-gray-300" />
          <div className="h-4 w-16 bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
