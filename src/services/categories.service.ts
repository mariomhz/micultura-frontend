// GET /api/categories

import { api } from "@/lib/api";
import type { Category } from "@/types";

export const categoriesService = {
  getAll: () => api.get<Category[]>("/api/categories").then((r) => r.data),
};
