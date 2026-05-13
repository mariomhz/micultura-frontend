"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { contactService } from "@/services/contact.service";

/* ── Types ── */
interface FormState {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "loading" | "success" | "error";

/* ── Validation ── */
function validate(f: FormState): FormErrors {
  const e: FormErrors = {};
  if (!f.nombre.trim())  e.nombre  = "El nombre es obligatorio.";
  if (!f.email.trim())   e.email   = "El email es obligatorio.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
                          e.email   = "Introduce un email válido.";
  if (!f.asunto.trim())  e.asunto  = "El asunto es obligatorio.";
  if (!f.mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
  else if (f.mensaje.trim().length < 10)
                          e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return e;
}

const EMPTY: FormState = { nombre: "", email: "", asunto: "", mensaje: "" };

/* ── Component ── */
export function ContactForm() {
  const [form, setForm]     = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [apiMsg, setApiMsg] = useState("");

  const { containerRef } = useGSAP(() => {
    gsap.from(".form-field", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setErrors({});
    try {
      await contactService.send(form);
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
      setApiMsg("No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.");
    }
  }

  /* ── Field helper ── */
  function Field({
    id,
    label,
    error,
    children,
  }: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="form-field flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-black uppercase tracking-widest text-neo-black">
          {label} <span className="text-red-600">*</span>
        </label>
        {children}
        {error && (
          <p className="text-xs font-bold text-red-600 flex items-center gap-1">
            ⚠ {error}
          </p>
        )}
      </div>
    );
  }

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div
        className="p-10 text-center"
        style={{
          border: "3px solid var(--neo-black)",
          boxShadow: "6px 6px 0 var(--neo-black)",
          background: "var(--neo-yellow)",
        }}
      >
        <p className="text-5xl mb-4">✅</p>
        <h3 className="text-2xl font-black text-neo-black mb-2">¡Mensaje enviado!</h3>
        <p className="text-neo-black font-medium mb-6">
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="neo-btn neo-btn-purple font-black"
          style={{ borderRadius: 0 }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div ref={containerRef}>
      {/* Error banner */}
      {status === "error" && (
        <div
          className="form-field mb-6 px-4 py-3 flex items-start gap-3 font-bold text-sm"
          style={{
            border: "2px solid var(--neo-black)",
            boxShadow: "3px 3px 0 var(--neo-black)",
            background: "#fee2e2",
            color: "#991b1b",
          }}
          role="alert"
        >
          <span className="text-lg shrink-0">❌</span>
          <span>{apiMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Nombre */}
        <Field id="nombre" label="Nombre" error={errors.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            autoComplete="name"
            className="neo-input font-medium"
            style={errors.nombre ? { borderColor: "#dc2626" } : {}}
          />
        </Field>

        {/* Email */}
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            autoComplete="email"
            className="neo-input font-medium"
            style={errors.email ? { borderColor: "#dc2626" } : {}}
          />
        </Field>

        {/* Asunto */}
        <Field id="asunto" label="Asunto" error={errors.asunto}>
          <select
            id="asunto"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            className="neo-input font-medium"
            style={errors.asunto ? { borderColor: "#dc2626" } : {}}
          >
            <option value="">Selecciona un asunto…</option>
            <option value="Información general">Información general</option>
            <option value="Proponer un evento">Proponer un evento</option>
            <option value="Error en la plataforma">Error en la plataforma</option>
            <option value="Colaboración">Colaboración</option>
            <option value="Otro">Otro</option>
          </select>
        </Field>

        {/* Mensaje */}
        <Field id="mensaje" label="Mensaje" error={errors.mensaje}>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={6}
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)…"
            className="neo-input font-medium resize-y"
            style={errors.mensaje ? { borderColor: "#dc2626" } : {}}
          />
        </Field>

        {/* Submit */}
        <div className="form-field">
          <button
            type="submit"
            disabled={status === "loading"}
            className="neo-btn neo-btn-purple w-full py-4 text-lg font-black"
            style={{ borderRadius: 0, opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Enviando…" : "Enviar mensaje →"}
          </button>
        </div>
      </form>
    </div>
  );
}
