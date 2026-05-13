// POST /api/contact

import { api } from "@/lib/api";

export interface ContactPayload {
  nombre: string;
  email: string;
  mensaje: string;
}

export const contactService = {
  send: (payload: ContactPayload) =>
    api.post<void>("/api/contact", payload).then((r) => r.data),
};
