import type { Event } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface AISearchResponse {
  reasoning: string;
  events: Event[];
}

interface ErrorBody {
  error?: string;
  message?: string;
}

export async function aiSearch(query: string): Promise<AISearchResponse> {
  const response = await fetch(`${API_URL}/api/search/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    let body: ErrorBody = {};
    try {
      body = (await response.json()) as ErrorBody;
    } catch {
      /* non-JSON */
    }
    throw new Error(
      body.error || body.message || `Búsqueda fallida (${response.status})`
    );
  }

  return (await response.json()) as AISearchResponse;
}
