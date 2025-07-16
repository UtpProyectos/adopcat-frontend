// src/services/productService.ts

import { api } from "./api";
import { Product } from "../models/product";

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  discountPct: number;
  imageUrl: string;
  categoryId: string;
  supplierId: string;
}

// Servicio agrupado para importar como productService
export const productService = {
  // Obtener todos los productos
  getAll: async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  },

  // Obtener un producto por ID
  getById: async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  // Crear un nuevo producto
  create: async (payload: ProductRequest): Promise<Product> => {
    const res = await api.post("/products", payload);
    return res.data;
  },

  // Actualizar un producto existente
  update: async (id: string, payload: ProductRequest): Promise<Product> => {
    const res = await api.put(`/products/${id}`, payload);
    return res.data;
  },

  // Eliminar un producto
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // ✅ Método coherente con frontend
  updateVisibility: async (id: string, visible: boolean): Promise<void> => {
    await api.patch(`/products/${id}/visibility`, { visible });
  },
};
