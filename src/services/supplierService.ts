// src/services/supplierService.ts

import { api } from "./api";

export interface Supplier {
  supplierId: string;
  name: string;
}

export const supplierService = {
  getAll: async (): Promise<Supplier[]> => {
    const res = await api.get("/product-suppliers");
    return res.data;
  },

  getById: async (id: string): Promise<Supplier> => {
    const res = await api.get(`/product-suppliers/${id}`);
    return res.data;
  },

  create: async (name: string): Promise<Supplier> => {
    const res = await api.post("/product-suppliers", { name });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/product-suppliers/${id}`);
  },
};
