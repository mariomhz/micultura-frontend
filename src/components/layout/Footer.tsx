import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Plataforma",
    links: [
      { href: "/",          label: "Inicio" },
      { href: "/events",    label: "Eventos" },
      { href: "/calendar",  label: "Calendario" },
      { href: "/map",       label: "Mapa" },
    ],
  },
  {
    heading: "Categorías",
    links: [
      { href: "/events", label: "🎵 Música" },
      { href: "/events", label: "🎭 Teatro" },
      { href: "/events", label: "🎨 Arte" },
      { href: "/events", label: "🎬 Cine" },
      { href: "/events", label: "💃 Danza" },
      { href: "/events", label: "📚 Literatura" },
    ],
  },
  {
    heading: "Proyecto",
    links: [
      { href: "/contact", label: "Contacto" },
      { href: "/about",   label: "Acerca de" },
    ],
  },
] as const;

const SOCIAL = [
  { href: "https://instagram.com",  label: "Instagram",  icon: "📸" },
  { href: "https://twitter.com",    label: "Twitter / X", icon: "🐦" },
  { href: "https://youtube.com",    label: "YouTube",     icon: "▶️" },
  { href: "https://github.com",     label: "GitHub",      icon: "💻" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-neo-black text-white"
      style={{ borderTop: "4px solid var(--neo-black)" }}
    >
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span
                className="px-2 py-0.5 text-lg font-black text-neo-black"
                style={{ background: "var(--neo-yellow)", border: "2px solid var(--neo-yellow)" }}
              >
                Mi
              </span>
              <span className="text-lg font-black text-white">Cultura</span>
            </Link>

            <p className="text-sm font-medium text-neo-gray leading-relaxed mb-6">
              La plataforma de referencia para eventos culturales en Tenerife. Música, teatro,
              arte y mucho más.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 font-black text-sm text-neo-black"
                  style={{
                    background: "var(--neo-yellow)",
                    border: "2px solid var(--neo-yellow)",
                    boxShadow: "2px 2px 0 rgba(255,255,255,0.3)",
                    transition: "box-shadow 0.1s ease, transform 0.1s ease",
                  }}
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h3
                className="text-xs font-black uppercase tracking-widest mb-4 pb-2"
                style={{
                  color: "var(--neo-yellow)",
                  borderBottom: "2px solid rgba(255,255,255,0.1)",
                }}
              >
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm font-medium text-neo-gray hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "2px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neo-gray">
            © {year}{" "}
            <span className="font-black text-white">MiCultura Tenerife</span>
            {" "}— Proyecto OPAL · DAW
          </p>
          <p className="text-xs text-neo-gray">
            Hecho con{" "}
            <span className="text-neo-yellow font-black">♥</span>
            {" "}en Tenerife
          </p>
        </div>
      </div>
    </footer>
  );
}
