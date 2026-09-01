// GET /api/categories

import { apiFetchWithTimeout } from "@/lib/api";
import { fallbackCategories } from "@/lib/fallbackData";
import type { Category } from "@/types";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await apiFetchWithTimeout("/api/categories");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return (await response.json()) as Category[];
    } catch {
      return fallbackCategories();
    }
  },
};
