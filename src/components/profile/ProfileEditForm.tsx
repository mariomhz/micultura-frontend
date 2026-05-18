"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateMe, type MeResponse } from "@/services/users";

interface Props {
  profile: MeResponse;
  onUpdated: (next: MeResponse) => void;
}

/**
 * Inline editable card showing the user's data. Edit mode swaps the value
 * spans for inputs; the password change is its own block (collapsed by
 * default) so casual edits to name/email don't ask for the current password.
 */
export default function ProfileEditForm({ profile, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(profile.nombre);
  const [email, setEmail] = useState(profile.email);
  const [showPwd, setShowPwd] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  function reset() {
    setNombre(profile.nombre);
    setEmail(profile.email);
    setShowPwd(false);
    setCurrentPassword("");
    setNewPassword("");
    setEditing(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    const payload: Record<string, string> = {};
    if (nombre.trim() && nombre.trim() !== profile.nombre) {
      payload.nombre = nombre.trim();
    }
    if (email.trim() && email.trim().toLowerCase() !== profile.email.toLowerCase()) {
      payload.email = email.trim();
    }
    if (showPwd) {
      if (!currentPassword || !newPassword) {
        toast.error("Indica tu contraseña actual y la nueva");
        return;
      }
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("Nada que actualizar");
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const next = await updateMe(payload);
      onUpdated(next);
      toast.success("Perfil actualizado");
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo guardar";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <div className="neo-card p-6 space-y-4">
        <Field label="Nombre" value={profile.nombre} />
        <Field label="Email" value={profile.email} />
        <Field label="Rol" value={profile.rol} />
        <Field label="Fecha de registro" value={formatDate(profile.createdAt)} />
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="neo-btn neo-btn-purple w-full"
        >
          Editar perfil
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="neo-card p-6 space-y-4">
      <div>
        <label className="text-sm font-semibold uppercase tracking-wide opacity-70 block mb-1">
          Nombre
        </label>
        <input
          type="text"
          className="neo-input w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={saving}
          maxLength={120}
        />
      </div>

      <div>
        <label className="text-sm font-semibold uppercase tracking-wide opacity-70 block mb-1">
          Email
        </label>
        <input
          type="email"
          className="neo-input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={saving}
        />
      </div>

      <div className="pt-2 border-t-2 border-neo-black/15">
        {!showPwd ? (
          <button
            type="button"
            onClick={() => setShowPwd(true)}
            className="text-sm font-bold underline hover:opacity-70"
          >
            Cambiar contraseña
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold uppercase tracking-wide opacity-70 block mb-1">
                Contraseña actual
              </label>
              <input
                type="password"
                className="neo-input w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={saving}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-wide opacity-70 block mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                className="neo-input w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={saving}
                minLength={8}
                autoComplete="new-password"
              />
              <p className="text-xs text-neo-gray mt-1">Mínimo 8 caracteres.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowPwd(false);
                setCurrentPassword("");
                setNewPassword("");
              }}
              className="text-xs underline opacity-70"
            >
              Cancelar cambio de contraseña
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 border-t-2 border-neo-black/15 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="neo-btn neo-btn-purple flex-1 disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={saving}
          className="neo-btn bg-neo-cream"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
