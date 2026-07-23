import { create } from 'zustand';
import api from '../api/axios';
import { API_ROUTES } from '../api/routes';
import { User } from '../types/user';
import { useCartStore } from './useCartStore';
import { useWishlistStore } from './useWishlistStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (code: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<any>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  authLoading: true,

  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  checkSession: async () => {
    try {
      set({ authLoading: true });
      const res = await api.get(API_ROUTES.USER_PROFILE);
      if (res.data && res.data.status === 200) {
        set({ user: res.data.data, isAuthenticated: true });
        useCartStore.getState().fetchCart();
        useWishlistStore.getState().fetchWishlist();
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ authLoading: false });
    }
  },

  login: async (email, password) => {
    const res = await api.post(API_ROUTES.USER_LOGIN, { email, password });
    if (res.data && res.data.status === 200) {
      set({ user: res.data.data, isAuthenticated: true });
      useCartStore.getState().fetchCart();
      useWishlistStore.getState().fetchWishlist();
    }
    return res.data;
  },

  signup: async (name, email, password) => {
    const res = await api.post(API_ROUTES.USER_SIGNUP, { name, email, password });
    return res.data;
  },

  verifyOtp: async (email, otp) => {
    const res = await api.post(API_ROUTES.USER_VERIFY, { email, otp });
    if (res.data && res.data.status === 200) {
      set({ isAuthenticated: true });
      await get().checkSession();
    }
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post(API_ROUTES.USER_FORGOT_PASSWORD, { email });
    return res.data;
  },

  resetPassword: async (code, password) => {
    const res = await api.post(API_ROUTES.USER_RESET_PASSWORD, { code, password });
    return res.data;
  },

  logout: async () => {
    try {
      await api.post(API_ROUTES.USER_LOGOUT);
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      set({ user: null, isAuthenticated: false });
      useCartStore.getState().resetCart();
      useWishlistStore.getState().resetWishlist();
    }
  },

  updateProfile: async (name) => {
    const res = await api.put(API_ROUTES.USER_PROFILE, { name });
    if (res.data && res.data.status === 200) {
      set((state) => ({ user: state.user ? { ...state.user, name } : null }));
    }
    return res.data;
  }
}));
