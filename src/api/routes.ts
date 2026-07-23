export const API_ROUTES = {
  // User & Auth
  USER_SIGNUP: '/users/signup',
  USER_VERIFY: '/users/verify',
  USER_LOGIN: '/users/login',
  USER_LOGOUT: '/users/logout',
  USER_FORGOT_PASSWORD: '/users/forgot-password',
  USER_RESET_PASSWORD: '/users/reset-password',
  USER_PROFILE: '/users/profile',
  USER_ALL_PRODUCTS: '/users/allproducts',
  USER_SEARCH: '/users/search',
  USER_FILTER: '/users/filter',
  USER_PRODUCT_DETAIL: (id: string | number) => `/users/products/${id}`,
  USER_ORDERS: (id: string | number) => `/users/${id}/orders`,
  USER_ORDER_CANCEL: (orderId: string | number) => `/users/${orderId}/cancel`,
  USER_ORDER_PRODUCT: (id: string | number) => `/users/${id}/orders/details`,

  // Cart
  CART: '/cart/',
  CART_ADD: '/cart/add',
  CART_ITEM: (productId: string | number) => `/cart/${productId}`,
  CART_CLEAR: '/cart/clear',

  // Wishlist
  WISHLIST: '/wishlist/',
  WISHLIST_ITEM: (productId: string | number) => `/wishlist/${productId}`,
  WISHLIST_CLEAR: '/wishlist/clear',

  // Addresses
  ADDRESSES: '/addresses/',
  ADDRESS_ITEM: (id: string | number) => `/addresses/${id}`,

  // Orders
  ORDERS: '/orders/',
  ORDER_ITEM: (id: string | number) => `/orders/${id}`,
  ORDER_BUY_NOW: '/orders/buy-now',
  ORDER_VERIFY_PAYMENT: '/orders/verify-payment',

  // Admin
  ADMIN_KPI: '/admin/dashboard/kpis',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_ITEM: (id: string | number) => `/admin/products/${id}`,
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_CATEGORY_ITEM: (id: string | number) => `/admin/categories/${id}`,
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_ITEM: (id: string | number) => `/admin/orders/${id}`,
  ADMIN_ORDER_STATUS: (orderId: string | number) => `/admin/orders/status/${orderId}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_ITEM: (id: string | number) => `/admin/users/${id}`,
  ADMIN_USER_BLOCK: (userId: string | number) => `/admin/users/'{userId}/block`,
} as const;

export default API_ROUTES;
