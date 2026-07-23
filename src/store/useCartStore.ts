import { create } from 'zustand';
import api from '../api/axios';
import { API_ROUTES } from '../api/routes';
import { CartAggregate } from '../types/product';
import { useAuthStore } from './useAuthStore';

interface CartState {
  cart: CartAggregate;
  setCart: (cart: CartAggregate) => void;
  resetCart: () => void;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string | number, quantity?: number) => Promise<any>;
  updateCartQuantity: (productId: string | number, quantity: number) => Promise<any>;
  removeFromCart: (productId: string | number) => Promise<any>;
  clearCart: () => Promise<any>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: { items: [], grand_total: 0, count: 0 },

  setCart: (cart) => set({ cart }),
  resetCart: () => set({ cart: { items: [], grand_total: 0, count: 0 } }),

  fetchCart: async () => {
    try {
      const res = await api.get(API_ROUTES.CART);
      if (res.data && res.data.status === 200) {
        set({ cart: res.data.data || { items: [], grand_total: 0, count: 0 } });
      }
    } catch (err) {
      console.error("Fetch cart error", err);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) throw new Error("Please login to add items to cart");

    const res = await api.post(API_ROUTES.CART_ADD, { product_id: productId, quantity });
    if (res.data && res.data.status === 200) {
      await get().fetchCart();
    }
    return res.data;
  },

  updateCartQuantity: async (productId, quantity) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    const res = await api.put(API_ROUTES.CART_ITEM(productId), { quantity });
    if (res.data && res.data.status === 200) {
      await get().fetchCart();
    }
    return res.data;
  },

  removeFromCart: async (productId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    const res = await api.delete(API_ROUTES.CART_ITEM(productId));
    if (res.data && res.data.status === 200) {
      await get().fetchCart();
    }
    return res.data;
  },

  clearCart: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    const res = await api.delete(API_ROUTES.CART_CLEAR);
    if (res.data && res.data.status === 200) {
      await get().fetchCart();
    }
    return res.data;
  }
}));
