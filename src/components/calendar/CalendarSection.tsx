import EventCalendar from "./EventCalendar";

export default function CalendarSection() {
  return (
    <div className="neo-card p-4 sm:p-6 hover:transform-none hover:shadow-[var(--neo-shadow)]">
      <EventCalendar />
    </div>
  );
}
