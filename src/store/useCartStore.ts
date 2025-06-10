import { create } from "zustand";
import { Product } from "../../src/models/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const existing = get().items.find(
      (item) => item.product.productId === product.productId
    );

    if (existing) {
      set({
        items: get().items.map((item) =>
          item.product.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...get().items, { product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set({
      items: get().items.filter(
        (item) => item.product.productId !== productId
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((acc, item) => {
      const price = item.product.price;
      const discount = item.product.discountPct;
      const final = price - (price * discount) / 100;
      return acc + final * item.quantity;
    }, 0),
}));
