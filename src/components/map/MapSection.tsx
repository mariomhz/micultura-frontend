import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./EventMap"), {
  ssr: false,
  loading: () => (
    <div className="neo-card flex items-center justify-center" style={{ height: "480px" }}>
      <p className="text-neo-gray font-bold animate-pulse">Cargando mapa...</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">
        Mapa de Eventos
      </h2>
      <div className="neo-card overflow-hidden hover:transform-none hover:shadow-[var(--neo-shadow)]">
        <EventMap />
      </div>
    </section>
  );
}
