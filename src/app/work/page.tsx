import Link from "next/link";

const projects = [
  { title: "Project Alpha", description: "A creative branding campaign" },
  { title: "Project Beta", description: "Interactive web experience" },
  { title: "Project Gamma", description: "Mobile app design system" },
  { title: "Project Delta", description: "E-commerce platform redesign" },
];

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-8 flex gap-4 text-sm">
        <Link href="/" className="underline hover:opacity-70">
          Home
        </Link>
        <Link href="/about" className="underline hover:opacity-70">
          About
        </Link>
        <Link href="/contact" className="underline hover:opacity-70">
          Contact
        </Link>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight">Work</h1>
      <p className="mt-4 text-lg text-zinc-500">
        Selected projects and case studies.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-zinc-500">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
