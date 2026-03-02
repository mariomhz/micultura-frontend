import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-8 flex gap-4 text-sm">
        <Link href="/" className="underline hover:opacity-70">
          Home
        </Link>
        <Link href="/work" className="underline hover:opacity-70">
          Work
        </Link>
        <Link href="/contact" className="underline hover:opacity-70">
          Contact
        </Link>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-lg text-zinc-500">
        This is a demo page showcasing page transitions powered by GSAP and
        Next.js App Router.
      </p>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <p>
          Each route change triggers a smooth fade-and-slide animation. The
          transition is handled by a <code>template.tsx</code> file that wraps
          every page in a <code>PageTransition</code> component. Because{" "}
          <code>template.tsx</code> re-mounts on navigation, the enter animation
          fires automatically.
        </p>
        <p>
          Meanwhile, a persistent <code>TransitionOverlay</code> in the root
          layout provides a color-wipe effect that plays independently of the
          page content animation.
        </p>
      </section>
    </main>
  );
}
