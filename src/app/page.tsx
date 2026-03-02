import Link from "next/link";
import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import FadeIn from "@/components/animations/FadeIn";
import ScaleUp from "@/components/animations/ScaleUp";
import FlipCard from "@/components/animations/FlipCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <PageLoadWrapper>
      <main className="mx-auto max-w-3xl px-6 py-12">
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
        </nav>

        <header className="text-center py-12">
          <h1 data-anim="hero-title" className="text-4xl font-bold tracking-tight">
            GSAP + Next.js Demo
          </h1>
          <p data-anim="hero-subtitle" className="mt-3 text-lg text-zinc-500">
            Foundation animations — fade, scale, flip, scroll
          </p>
        </header>

        <div data-anim="section">
          <FadeIn />
        </div>

        <div data-anim="section">
          <ScaleUp />
        </div>

        <div data-anim="section">
          <FlipCard />
        </div>

        <div data-anim="section" className="min-h-screen">
          <ScrollReveal />
        </div>
      </main>
    </PageLoadWrapper>
  );
}
