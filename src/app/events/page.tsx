import { EventCatalog } from "@/components/events/EventCatalog";

export const metadata = {
  title: "Eventos Culturales — MiCultura Tenerife",
  description:
    "Descubre los mejores eventos culturales y deportivos de Tenerife: conciertos, exposiciones, teatro, cine y más.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-neo-white">
      {/* Hero header */}
      <section
        className="py-16 px-4"
        style={{
          background: "var(--neo-purple)",
          borderBottom: "4px solid var(--neo-black)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-neo-yellow font-black uppercase tracking-widest text-sm mb-2 anim-fade-in">
            📍 Tenerife
          </p>
          <h1
            className="text-5xl md:text-7xl font-black text-white leading-none anim-fade-in anim-delay-1"
            style={{ textShadow: "4px 4px 0 var(--neo-black)" }}
          >
            Eventos
            <br />
            <span className="text-neo-yellow">Culturales</span>
          </h1>
          <p className="mt-4 text-neo-lilac-light font-medium text-lg max-w-xl anim-fade-in anim-delay-2">
            Descubre conciertos, exposiciones, teatro, cine y mucho más en la isla.
          </p>
        </div>
      </section>

      {/* Catalog: fetches from API, falls back to mock */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <EventCatalog />
      </section>
    </main>
  );
}
