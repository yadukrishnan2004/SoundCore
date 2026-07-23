import React, { createContext, useEffect, ReactNode } from 'react';
import { User, WishlistAggregate } from '../types/user';
import { CartAggregate } from '../types/product';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

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
  const authState = useAuthStore();
  const cartState = useCartStore();
  const wishlistState = useWishlistStore();

  useEffect(() => {
    authState.checkSession();
  }, []);

  return (
    <AppContext.Provider value={{
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      authLoading: authState.authLoading,
      cart: cartState.cart,
      wishlist: wishlistState.wishlist,
      checkSession: authState.checkSession,
      login: authState.login,
      signup: authState.signup,
      verifyOtp: authState.verifyOtp,
      forgotPassword: authState.forgotPassword,
      resetPassword: authState.resetPassword,
      logout: authState.logout,
      updateProfile: authState.updateProfile,
      fetchCart: cartState.fetchCart,
      addToCart: cartState.addToCart,
      updateCartQuantity: cartState.updateCartQuantity,
      removeFromCart: cartState.removeFromCart,
      clearCart: cartState.clearCart,
      fetchWishlist: wishlistState.fetchWishlist,
      addToWishlist: wishlistState.addToWishlist,
      removeFromWishlist: wishlistState.removeFromWishlist,
      clearWishlist: wishlistState.clearWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
