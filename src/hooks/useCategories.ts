"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/types";
import { categoriesService } from "@/services/categories.service";
import { mockCategories } from "@/mocks/events";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  usingMock: boolean;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
      setCategories(mockCategories);
      setUsingMock(true);
      setLoading(false);
      return;
    }

    categoriesService
      .getAll()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setCategories(mockCategories);
        setUsingMock(true);
        setLoading(false);
      });
  }, []);

  return { categories, loading, usingMock };
}
