import EventCalendar from "./EventCalendar";

export default function CalendarSection() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">
        Calendario de Eventos
      </h2>
      <div className="neo-card p-4 sm:p-6 hover:transform-none hover:shadow-[var(--neo-shadow)]">
        <EventCalendar />
      </div>
    </section>
  );
}
