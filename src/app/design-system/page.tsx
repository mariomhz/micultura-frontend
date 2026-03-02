import Link from "next/link";
import DesignSystemShowcase from "./DesignSystemShowcase";

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-8 flex gap-4 text-sm">
        <Link href="/" className="underline hover:opacity-70">Home</Link>
        <Link href="/about" className="underline hover:opacity-70">About</Link>
        <Link href="/work" className="underline hover:opacity-70">Work</Link>
      </nav>

      <header className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight">Neobrutalism Design System</h1>
        <p className="mt-3 text-lg text-neo-gray">
          Colors, shadows, borders, and animation utilities
        </p>
      </header>

      <DesignSystemShowcase />
    </main>
  );
}
