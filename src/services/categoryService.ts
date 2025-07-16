// src/services/categoryService.ts

import { api } from "./api";

export interface Category {
  categoryId: string;
  name: string;
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get("/product-categories");
    return res.data;
  },

  // Extra opcionales para el futuro:
  getById: async (id: string): Promise<Category> => {
    const res = await api.get(`/product-categories/${id}`);
    return res.data;
  },

  create: async (name: string): Promise<Category> => {
    const res = await api.post("/product-categories", { name });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/product-categories/${id}`);
  },
};
