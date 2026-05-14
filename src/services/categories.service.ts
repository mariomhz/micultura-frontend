// GET /api/categories

import { apiFetch } from "@/lib/api";
import type { Category } from "@/types";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiFetch("/api/categories");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as Category[];
  },
};
