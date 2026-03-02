import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-8 flex gap-4 text-sm">
        <Link href="/" className="underline hover:opacity-70">
          Home
        </Link>
        <Link href="/about" className="underline hover:opacity-70">
          About
        </Link>
        <Link href="/work" className="underline hover:opacity-70">
          Work
        </Link>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-zinc-500">
        Get in touch — we&apos;d love to hear from you.
      </p>

      <section className="mt-12 space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Email
          </h2>
          <p className="mt-1">hello@example.com</p>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Location
          </h2>
          <p className="mt-1">San Juan, Puerto Rico</p>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Social
          </h2>
          <p className="mt-1">@micultura</p>
        </div>
      </section>
    </main>
  );
}
