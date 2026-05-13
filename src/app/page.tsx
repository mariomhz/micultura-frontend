import Link from "next/link";
import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import CalendarSection from "@/components/calendar/CalendarSection";
import MapSection from "@/components/map/MapSection";
import AuthStatus from "@/components/auth/AuthStatus";

export default function Home() {
  return (
    <PageLoadWrapper>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <nav className="mb-8 flex flex-wrap gap-3 text-sm">
          <Link href="/design-system" className="neo-btn neo-btn-purple text-sm py-1.5 px-3">
            Design System
          </Link>
          <Link href="/about" className="underline hover:opacity-70">
            About
          </Link>
          <Link href="/work" className="underline hover:opacity-70">
            Work
          </Link>
          <Link href="/contact" className="underline hover:opacity-70">
            Contact
          </Link>
          <span className="ml-auto flex flex-wrap gap-3 items-center">
            <AuthStatus />
          </span>
        </nav>

        <header className="text-center py-12">
          <h1 data-anim="hero-title" className="text-4xl font-bold tracking-tight">
            MiCultura
          </h1>
          <p data-anim="hero-subtitle" className="mt-3 text-lg text-zinc-500">
            Descubre eventos culturales en Puerto Rico
          </p>
        </header>

        <CalendarSection />

        <hr className="neo-divider" />

        <MapSection />
      </main>
    </PageLoadWrapper>
  );
}
