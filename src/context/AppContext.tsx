import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';
import { API_ROUTES } from '../api/routes';
import { User, WishlistAggregate } from '../types/user';
import { CartAggregate } from '../types/product';

export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  cart: CartAggregate;
  wishlist: WishlistAggregate;
  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (code: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<any>;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string | number, quantity?: number) => Promise<any>;
  updateCartQuantity: (productId: string | number, quantity: number) => Promise<any>;
  removeFromCart: (productId: string | number) => Promise<any>;
  clearCart: () => Promise<any>;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string | number) => Promise<any>;
  removeFromWishlist: (productId: string | number) => Promise<any>;
  clearWishlist: () => Promise<any>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Cart state
  const [cart, setCart] = useState<CartAggregate>({ items: [], grand_total: 0, count: 0 });

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistAggregate>({ item: [], count: 0 });

  // ----------------------------------------------------
  // Session Check / Profile Methods
  // ----------------------------------------------------
  const checkSession = async () => {
    try {
      setAuthLoading(true);
      const res = await api.get(API_ROUTES.USER_PROFILE);
      if (res.data && res.data.status === 200) {
        setUser(res.data.data);
        setIsAuthenticated(true);
        // Fetch cart and wishlist on success
        fetchCart();
        fetchWishlist();
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ----------------------------------------------------
  // Auth API Methods
  // ----------------------------------------------------
  const login = async (email: string, password: string) => {
    const res = await api.post(API_ROUTES.USER_LOGIN, { email, password });
    if (res.data && res.data.status === 200) {
      setUser(res.data.data);
      setIsAuthenticated(true);
      fetchCart();
      fetchWishlist();
    }
    return res.data;
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await api.post(API_ROUTES.USER_SIGNUP, { name, email, password });
    return res.data;
  };

  const verifyOtp = async (email: string, otp: string) => {
    const res = await api.post(API_ROUTES.USER_VERIFY, { email, otp });
    if (res.data && res.data.status === 200) {
      setIsAuthenticated(true);
      // Fetch profile after verification loads token cookie
      await checkSession();
    }
    return res.data;
  };

  const forgotPassword = async (email: string) => {
    const res = await api.post(API_ROUTES.USER_FORGOT_PASSWORD, { email });
    return res.data;
  };

  const resetPassword = async (code: string, password: string) => {
    const res = await api.post(API_ROUTES.USER_RESET_PASSWORD, { code, password });
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post(API_ROUTES.USER_LOGOUT);
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setCart({ items: [], grand_total: 0, count: 0 });
      setWishlist({ item: [], count: 0 });
    }
  };

  const updateProfile = async (name: string) => {
    const res = await api.put(API_ROUTES.USER_PROFILE, { name });
    if (res.data && res.data.status === 200) {
      setUser(prev => prev ? { ...prev, name } : null);
    }
    return res.data;
  };

  // ----------------------------------------------------
  // Cart API Methods
  // ----------------------------------------------------
  const fetchCart = async () => {
    try {
      const res = await api.get(API_ROUTES.CART);
      if (res.data && res.data.status === 200) {
        setCart(res.data.data || { items: [], grand_total: 0, count: 0 });
      }
    } catch (err) {
      console.error("Fetch cart error", err);
    }
  };

  const addToCart = async (productId: string | number, quantity = 1) => {
    if (!isAuthenticated) throw new Error("Please login to add items to cart");
    const res = await api.post(API_ROUTES.CART_ADD, { product_id: productId, quantity });
    if (res.data && res.data.status === 200) {
      fetchCart();
    }
    return res.data;
  };

  const updateCartQuantity = async (productId: string | number, quantity: number) => {
    if (!isAuthenticated) return;
    const res = await api.put(API_ROUTES.CART_ITEM(productId), { quantity });
    if (res.data && res.data.status === 200) {
      fetchCart();
    }
    return res.data;
  };

  const removeFromCart = async (productId: string | number) => {
    if (!isAuthenticated) return;
    const res = await api.delete(API_ROUTES.CART_ITEM(productId));
    if (res.data && res.data.status === 200) {
      fetchCart();
    }
    return res.data;
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    const res = await api.delete(API_ROUTES.CART_CLEAR);
    if (res.data && res.data.status === 200) {
      fetchCart();
    }
    return res.data;
  };

  // ----------------------------------------------------
  // Wishlist API Methods
  // ----------------------------------------------------
  const fetchWishlist = async () => {
    try {
      const res = await api.get(API_ROUTES.WISHLIST);
      if (res.data && res.data.status === 200) {
        setWishlist(res.data.data || { item: [], count: 0 });
      }
    } catch (err) {
      console.error("Fetch wishlist error", err);
    }
  };

  const addToWishlist = async (productId: string | number) => {
    if (!isAuthenticated) throw new Error("Please login to add items to favorites");
    const res = await api.post(API_ROUTES.WISHLIST_ITEM(productId));
    if (res.data && res.data.status === 200) {
      fetchWishlist();
    }
    return res.data;
  };

  const removeFromWishlist = async (productId: string | number) => {
    if (!isAuthenticated) return;
    const res = await api.delete(API_ROUTES.WISHLIST_ITEM(productId));
    if (res.data && res.data.status === 200) {
      fetchWishlist();
    }
    return res.data;
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) return;
    const res = await api.delete(API_ROUTES.WISHLIST_CLEAR);
    if (res.data && res.data.status === 200) {
      fetchWishlist();
    }
    return res.data;
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      authLoading,
      cart,
      wishlist,
      checkSession,
      login,
      signup,
      verifyOtp,
      forgotPassword,
      resetPassword,
      logout,
      updateProfile,
      fetchCart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      fetchWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
