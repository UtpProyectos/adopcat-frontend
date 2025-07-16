export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  discountPct: number;
  imageUrl: string;
  categoryId: string;       // ✅ nuevo
  categoryName: string;
  supplierId: string;       // ✅ nuevo
  supplierName: string;
  isActive: boolean;        // ✅ nuevo para visibilidad
}
