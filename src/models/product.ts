export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  discountPct: number;
  imageUrl: string;
  isActive: boolean;

  // Agrega estos si los necesitas
  categoryId?: string;
  supplierId?: string;
  createdAt?: string;
}
