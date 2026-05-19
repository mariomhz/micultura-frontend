import Link from "next/link";
import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import HeroShapes from "@/components/animations/HeroShapes";
import HeroMarquee from "@/components/animations/HeroMarquee";
import CalendarSection from "@/components/calendar/CalendarSection";
import MapSection from "@/components/map/MapSection";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <PageLoadWrapper>
      <Navbar />

      <main>
        {/* ===== Hero Section ===== */}
        <section className="relative bg-neo-purple overflow-hidden flex flex-col min-h-[540px] md:min-h-[640px]">
          <HeroShapes />

          <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                data-anim="hero-title"
                className="font-heading text-[2rem] sm:text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]"
              >
                Descubre la Cultura
                <br />
                de Tenerife
              </h1>
              <p
                data-anim="hero-subtitle"
                className="mt-4 text-base sm:text-lg md:text-xl text-purple-200 font-body max-w-2xl mx-auto"
              >
                Festivales, conciertos, exposiciones, talleres y mucho
                m&aacute;s. Todo lo que pasa en la isla, en un solo lugar.
              </p>
              <div data-anim="hero-cta" className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
                <a
                  href="#eventos"
                  className="neo-btn neo-btn-yellow text-base px-6 py-3"
                >
                  Ver Eventos
                </a>
                <a
                  href="#calendario"
                  className="neo-btn bg-white text-neo-black text-base px-6 py-3"
                >
                  Calendario
                </a>
              </div>
            </div>
          </div>

          <HeroMarquee />
        </section>

        {/* ===== Featured Events ===== */}
        <section id="eventos" data-anim="section" className="px-6 py-16 bg-neo-white">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-2">
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Pr&oacute;ximos Eventos
              </h2>
              <Link
                href="/events"
                className="font-heading text-sm font-bold uppercase tracking-wider hover:opacity-70 underline underline-offset-4 decoration-2"
              >
                Ver todos →
              </Link>
            </div>
            <p className="text-neo-gray font-body mb-8">
              Lo mejor de la agenda cultural de Tenerife
            </p>
            <FeaturedEvents />

            <div className="mt-10 flex justify-center">
              <Link
                href="/events"
                className="neo-btn neo-btn-yellow text-base px-7 py-3 inline-flex items-center gap-2"
              >
                Ver todos los eventos
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Calendar Section ===== */}
        <section id="calendario" data-anim="section" className="px-6 py-16 bg-neo-cream">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight mb-2">
              Calendario de Eventos
            </h2>
            <p className="text-neo-gray font-body mb-8">
              Explora todos los eventos por fecha
            </p>
            <CalendarSection />
          </div>
        </section>

        {/* ===== Map Section ===== */}
        <section id="mapa" data-anim="section" className="px-6 py-16 bg-neo-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight mb-2">
              Mapa de Eventos
            </h2>
            <p className="text-neo-gray font-body mb-8">
              Encuentra eventos cerca de ti en Tenerife
            </p>
            <MapSection />
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-neo-black text-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <span className="font-heading text-2xl font-bold">MiCultura</span>
              <p className="text-sm text-gray-400 mt-2 font-body">
                Plataforma de eventos culturales de Tenerife
              </p>
            </div>
            <div className="flex gap-8 font-body text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Explorar
                </span>
                <a href="#eventos" className="hover:text-neo-yellow transition-colors">
                  Eventos
                </a>
                <a href="#calendario" className="hover:text-neo-yellow transition-colors">
                  Calendario
                </a>
                <a href="#mapa" className="hover:text-neo-yellow transition-colors">
                  Mapa
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Cuenta
                </span>
                <a href="/login" className="hover:text-neo-yellow transition-colors">
                  Iniciar Sesi&oacute;n
                </a>
                <a href="/register" className="hover:text-neo-yellow transition-colors">
                  Registrarse
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500 font-body">
            &copy; {new Date().getFullYear()} MiCultura. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </PageLoadWrapper>
  );
}
