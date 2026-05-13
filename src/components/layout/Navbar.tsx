"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/",          label: "Inicio" },
  { href: "/events",    label: "Eventos" },
  { href: "/calendar",  label: "Calendario" },
  { href: "/map",       label: "Mapa" },
  { href: "/contact",   label: "Contacto" },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-neo-white"
      style={{ borderBottom: "4px solid var(--neo-black)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-1 shrink-0" onClick={() => setOpen(false)}>
            <span
              className="px-2 py-0.5 text-lg font-black text-neo-black leading-none"
              style={{ background: "var(--neo-yellow)", border: "2px solid var(--neo-black)" }}
            >
              Mi
            </span>
            <span className="text-lg font-black text-neo-black tracking-tight">Cultura</span>
          </Link>

          {/* ── Desktop links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href, pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 text-sm font-black transition-none"
                  style={
                    active
                      ? {
                          background: "var(--neo-yellow)",
                          border: "2px solid var(--neo-black)",
                          boxShadow: "2px 2px 0 var(--neo-black)",
                          color: "var(--neo-black)",
                        }
                      : {
                          border: "2px solid transparent",
                          color: "var(--neo-black)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--neo-black)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 var(--neo-black)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 items-center"
            style={{
              border: "2px solid var(--neo-black)",
              background: open ? "var(--neo-yellow)" : "transparent",
              boxShadow: open ? "none" : "2px 2px 0 var(--neo-black)",
              transition: "background 0.15s ease",
            }}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className="block w-5 h-[2px] bg-neo-black origin-center"
              style={{
                transition: "transform 0.2s ease",
                transform: open ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] bg-neo-black"
              style={{ transition: "opacity 0.2s ease", opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[2px] bg-neo-black origin-center"
              style={{
                transition: "transform 0.2s ease",
                transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile menu panel ── */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: open ? "360px" : "0",
          transition: "max-height 0.3s ease",
          borderTop: open ? "3px solid var(--neo-black)" : "none",
        }}
      >
        <nav className="flex flex-col gap-2 px-4 py-4 bg-neo-white" aria-label="Menú móvil">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 font-black text-base"
                style={
                  active
                    ? {
                        background: "var(--neo-yellow)",
                        border: "2px solid var(--neo-black)",
                        boxShadow: "2px 2px 0 var(--neo-black)",
                        color: "var(--neo-black)",
                      }
                    : {
                        border: "2px solid var(--neo-black)",
                        color: "var(--neo-black)",
                      }
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
