import { api } from "./api"; // asegúrate que esté en el mismo folder o ajusta la ruta
import { Product } from "../models/product";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};
