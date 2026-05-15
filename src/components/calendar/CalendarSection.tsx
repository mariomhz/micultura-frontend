import EventCalendar from "./EventCalendar";

export default function CalendarSection() {
  return (
    <div
      className="neo-card hover:transform-none hover:shadow-[var(--neo-shadow)]"
      style={{ overflow: "hidden" }}
    >
      {/* overflow-x:auto so FullCalendar's fixed-width grid scrolls instead of breaking the layout */}
      <div className="overflow-x-auto p-4 sm:p-6" style={{ minWidth: 0 }}>
        <div style={{ minWidth: "320px" }}>
          <EventCalendar />
        </div>
      </div>
    </div>
  );
}
