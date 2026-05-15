"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthStatus from "@/components/auth/AuthStatus";

const NAV_LINKS = [
  { href: "#eventos",    label: "Eventos"     },
  { href: "#calendario", label: "Calendario"  },
  { href: "#mapa",       label: "Mapa"        },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // usePathname() lets AuthStatus know if we're on login/register
  usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-neo-white"
      style={{ borderBottom: "4px solid var(--neo-black)" }}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-xl font-bold tracking-tight leading-none">
              MiCultura
            </span>
            <span
              className="neo-tag hidden xs:inline-block text-[10px]"
              style={{ background: "var(--neo-purple)", color: "white" }}
            >
              Tenerife
            </span>
          </a>

          {/* ── Desktop links ── */}
          <nav className="hidden sm:flex items-center gap-6 font-body text-sm font-semibold">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="hover:text-neo-purple transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Right: auth + hamburger ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auth — compact on mobile */}
            <div className="flex items-center gap-2">
              <AuthStatus compact />
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center shrink-0"
              style={{
                border: "2px solid var(--neo-black)",
                background: open ? "var(--neo-yellow)" : "transparent",
                boxShadow: open ? "none" : "2px 2px 0 var(--neo-black)",
              }}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className="block w-4 h-[2px] bg-neo-black origin-center"
                style={{ transition: "transform 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-4 h-[2px] bg-neo-black"
                style={{ transition: "opacity 0.2s", opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-4 h-[2px] bg-neo-black origin-center"
                style={{ transition: "transform 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <div
        className="sm:hidden overflow-hidden"
        style={{
          maxHeight: open ? "300px" : "0",
          transition: "max-height 0.3s ease",
          borderTop: open ? "3px solid var(--neo-black)" : "none",
        }}
      >
        <nav className="flex flex-col gap-1 px-4 py-3 bg-neo-white">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 font-black text-base"
              style={{ border: "2px solid var(--neo-black)", color: "var(--neo-black)" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
