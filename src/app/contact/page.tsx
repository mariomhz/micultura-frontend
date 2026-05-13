import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — MiCultura Tenerife",
  description: "Ponte en contacto con el equipo de MiCultura Tenerife.",
};

const INFO = [
  { icon: "📍", label: "Ubicación",   value: "Santa Cruz de Tenerife, Islas Canarias" },
  { icon: "📧", label: "Email",       value: "hola@micultura.es" },
  { icon: "🕒", label: "Respuesta",   value: "En menos de 48 horas" },
  { icon: "🌐", label: "Redes",       value: "@MiCulturaTFE" },
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neo-white">
      {/* ── Page header ── */}
      <section
        className="py-16 px-4"
        style={{ background: "var(--neo-black)", borderBottom: "4px solid var(--neo-black)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-neo-yellow font-black uppercase tracking-widest text-sm mb-2">
            ✉️ Escríbenos
          </p>
          <h1
            className="text-5xl md:text-6xl font-black text-white leading-tight"
            style={{ textShadow: "4px 4px 0 var(--neo-purple)" }}
          >
            Contacto
          </h1>
          <p className="mt-4 text-neo-gray font-medium text-lg max-w-xl">
            ¿Tienes alguna pregunta, propuesta o simplemente quieres saludar?
            Escríbenos y te respondemos pronto.
          </p>
        </div>
      </section>

      {/* ── Content grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* ── Form (3/5) ── */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-black text-neo-black mb-8 pb-3" style={{ borderBottom: "3px solid var(--neo-black)" }}>
            Envíanos un mensaje
          </h2>
          <ContactForm />
        </div>

        {/* ── Info sidebar (2/5) ── */}
        <aside className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-2xl font-black text-neo-black pb-3" style={{ borderBottom: "3px solid var(--neo-black)" }}>
            Información
          </h2>

          {INFO.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex gap-4 p-5 bg-neo-cream"
              style={{ border: "3px solid var(--neo-black)", boxShadow: "4px 4px 0 var(--neo-black)" }}
            >
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-neo-gray mb-1">
                  {label}
                </p>
                <p className="font-bold text-neo-black">{value}</p>
              </div>
            </div>
          ))}

          {/* Promo box */}
          <div
            className="p-6 mt-2"
            style={{
              border: "3px solid var(--neo-black)",
              boxShadow: "4px 4px 0 var(--neo-black)",
              background: "var(--neo-purple)",
            }}
          >
            <p className="text-neo-yellow font-black uppercase tracking-widest text-xs mb-2">
              ¿Organizas eventos?
            </p>
            <p className="text-white font-bold text-sm leading-relaxed">
              Si tienes un evento cultural en Tenerife y quieres que aparezca en nuestra
              plataforma, escríbenos y lo revisamos.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
