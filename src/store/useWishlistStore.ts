import { create } from 'zustand';
import api from '../api/axios';
import { API_ROUTES } from '../api/routes';
import { WishlistAggregate } from '../types/user';
import { useAuthStore } from './useAuthStore';

interface WishlistState {
  wishlist: WishlistAggregate;
  setWishlist: (wishlist: WishlistAggregate) => void;
  resetWishlist: () => void;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string | number) => Promise<any>;
  removeFromWishlist: (productId: string | number) => Promise<any>;
  clearWishlist: () => Promise<any>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: { item: [], count: 0 },

  setWishlist: (wishlist) => set({ wishlist }),
  resetWishlist: () => set({ wishlist: { item: [], count: 0 } }),

  fetchWishlist: async () => {
    try {
      const res = await api.get(API_ROUTES.WISHLIST);
      if (res.data && res.data.status === 200) {
        set({ wishlist: res.data.data || { item: [], count: 0 } });
      }
    } catch (err) {
      console.error("Fetch wishlist error", err);
    }
  },

  addToWishlist: async (productId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) throw new Error("Please login to add items to favorites");

    const res = await api.post(API_ROUTES.WISHLIST_ITEM(productId));
    if (res.data && res.data.status === 200) {
      await get().fetchWishlist();
    }
    return res.data;
  },

  removeFromWishlist: async (productId) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    const res = await api.delete(API_ROUTES.WISHLIST_ITEM(productId));
    if (res.data && res.data.status === 200) {
      await get().fetchWishlist();
    }
    return res.data;
  },

  clearWishlist: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;

    const res = await api.delete(API_ROUTES.WISHLIST_CLEAR);
    if (res.data && res.data.status === 200) {
      await get().fetchWishlist();
    }
    return res.data;
  }
}));
