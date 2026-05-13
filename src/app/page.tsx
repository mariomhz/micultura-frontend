import Link from "next/link";
import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import { mockEvents, mockCategories } from "@/mocks/events";
import { EventCard } from "@/components/events/EventCard";
import CalendarSection from "@/components/calendar/CalendarSection";
import MapSection from "@/components/map/MapSection";

const FEATURES = [
  {
    icon: "🔍",
    title: "Descubre",
    desc: "Explora todos los eventos culturales de la isla ordenados por categoría y fecha.",
    bg: "var(--neo-yellow)",
  },
  {
    icon: "🎯",
    title: "Filtra",
    desc: "Selecciona teatro, música, arte, cine o danza y encuentra exactamente lo que buscas.",
    bg: "var(--neo-lilac)",
  },
  {
    icon: "🎟️",
    title: "Asiste",
    desc: "Compra tu entrada directamente desde la ficha del evento con un solo clic.",
    bg: "var(--neo-gold-light)",
  },
  {
    icon: "📍",
    title: "Localiza",
    desc: "Consulta el mapa interactivo y llega sin complicaciones a cada espacio cultural.",
    bg: "var(--neo-lilac-light)",
  },
] as const;

const STATS = [
  { value: "100+", label: "Eventos" },
  { value: "6",    label: "Categorías" },
  { value: "8",    label: "Municipios" },
  { value: "24/7", label: "Actualizado" },
] as const;

export default function Home() {
  const featured = mockEvents.slice(0, 3);

  return (
    <PageLoadWrapper>
      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden px-4 py-20"
        style={{ background: "var(--neo-purple)" }}
      >
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-black leading-none select-none pointer-events-none opacity-[0.06] text-white"
        >
          CULTURA
        </span>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-3xl">
            <p
              data-anim="hero-subtitle"
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 font-black text-sm uppercase tracking-widest text-neo-black"
              style={{ background: "var(--neo-yellow)", border: "2px solid var(--neo-black)" }}
            >
              📍 Tenerife · Islas Canarias
            </p>

            <h1
              data-anim="hero-title"
              className="font-black text-white leading-[0.92] mb-6"
              style={{
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                textShadow: "6px 6px 0 var(--neo-black)",
              }}
            >
              La cultura
              <br />
              de{" "}
              <span style={{ color: "var(--neo-yellow)" }}>Tenerife</span>
              <br />
              en tu mano.
            </h1>

            <p
              data-anim="hero-subtitle"
              className="text-xl font-medium mb-10 max-w-xl"
              style={{ color: "var(--neo-lilac-light)" }}
            >
              Conciertos, teatro, exposiciones, cine y mucho más. Todos los eventos culturales
              de la isla, en un solo lugar.
            </p>

            <div data-anim="section" className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="neo-btn neo-btn-yellow text-lg px-8 py-4 font-black"
                style={{ borderRadius: 0, fontSize: "1.1rem" }}
              >
                Explorar eventos →
              </Link>
              <Link
                href="/map"
                className="neo-btn text-lg px-8 py-4 font-black"
                style={{
                  borderRadius: 0,
                  fontSize: "1.1rem",
                  background: "transparent",
                  border: "3px solid white",
                  color: "white",
                  boxShadow: "4px 4px 0 var(--neo-black)",
                }}
              >
                Ver en mapa
              </Link>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-4"
          style={{ background: "var(--neo-black)" }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <section
        data-anim="section"
        className="py-0"
        style={{ background: "var(--neo-black)", borderBottom: "4px solid var(--neo-black)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="py-6 text-center"
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "2px solid rgba(255,255,255,0.15)" : "none",
                }}
              >
                <dd className="text-4xl font-black text-neo-yellow">{value}</dd>
                <dt className="text-sm font-bold text-neo-gray uppercase tracking-widest mt-1">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════ */}
      <section data-anim="section" className="py-20 px-4" style={{ background: "var(--neo-white)" }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-black text-neo-black mb-3"
            style={{ textShadow: "3px 3px 0 var(--neo-yellow)" }}
          >
            ¿Qué encontrarás?
          </h2>
          <p className="text-neo-gray font-medium mb-12 text-lg">
            Todo lo que necesitas para no perderte nada.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc, bg }) => (
              <div
                key={title}
                className="p-6 flex flex-col gap-3"
                style={{
                  border: "3px solid var(--neo-black)",
                  boxShadow: "5px 5px 0 var(--neo-black)",
                  background: bg,
                }}
              >
                <span className="text-4xl">{icon}</span>
                <h3 className="text-xl font-black text-neo-black">{title}</h3>
                <p className="text-sm font-medium text-neo-black leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════ */}
      <section
        data-anim="section"
        className="py-20 px-4"
        style={{
          background: "var(--neo-cream)",
          borderTop: "4px solid var(--neo-black)",
          borderBottom: "4px solid var(--neo-black)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-neo-black mb-10">
            Explora por categoría
          </h2>
          <div className="flex flex-wrap gap-4">
            {mockCategories.map((cat) => (
              <Link
                key={cat.id}
                href="/events"
                className="neo-chip flex items-center gap-3 px-5 py-3 font-black text-base text-neo-black"
              >
                <span className="text-2xl">{cat.icono}</span>
                <span>{cat.nombre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LATEST EVENTS PREVIEW
      ══════════════════════════════════════════════════ */}
      <section data-anim="section" className="py-20 px-4" style={{ background: "var(--neo-white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-neo-black">
                Próximos eventos
              </h2>
              <p className="text-neo-gray font-medium mt-1">No te pierdas lo que se viene.</p>
            </div>
            <Link
              href="/events"
              className="neo-btn neo-btn-purple font-black"
              style={{ borderRadius: 0 }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CALENDARIO (MC-03)
      ══════════════════════════════════════════════════ */}
      <section
        data-anim="section"
        className="py-20 px-4"
        style={{ background: "var(--neo-cream)", borderTop: "4px solid var(--neo-black)" }}
      >
        <div className="max-w-7xl mx-auto">
          <CalendarSection />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MAPA (MC-03)
      ══════════════════════════════════════════════════ */}
      <section
        data-anim="section"
        className="py-20 px-4"
        style={{ background: "var(--neo-white)", borderTop: "4px solid var(--neo-black)" }}
      >
        <div className="max-w-7xl mx-auto">
          <MapSection />
        </div>
      </section>
    </PageLoadWrapper>
  );
}
