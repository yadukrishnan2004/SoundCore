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
  USER_PRODUCT_DETAIL: (id) => `/users/products/${id}`,
  USER_ORDERS: (id) => `/users/${id}/orders`,
  USER_ORDER_CANCEL: (orderId) => `/users/${orderId}/cancel`,
  USER_ORDER_PRODUCT: (id) => `/users/${id}/orders/details`,

  // Cart
  CART: '/cart/',
  CART_ADD: '/cart/add',
  CART_ITEM: (productId) => `/cart/${productId}`,
  CART_CLEAR: '/cart/clear',

  // Wishlist
  WISHLIST: '/wishlist/',
  WISHLIST_ITEM: (productId) => `/wishlist/${productId}`,
  WISHLIST_CLEAR: '/wishlist/clear',

  // Addresses
  ADDRESSES: '/addresses/',
  ADDRESS_ITEM: (id) => `/addresses/${id}`,

  // Orders
  ORDERS: '/orders/',
  ORDER_ITEM: (id) => `/orders/${id}`,
  ORDER_BUY_NOW: '/orders/buy-now',
  ORDER_VERIFY_PAYMENT: '/orders/verify-payment',

  // Admin
  ADMIN_KPI: '/admin/dashboard/kpis',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_ITEM: (id) => `/admin/products/${id}`,
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_CATEGORY_ITEM: (id) => `/admin/categories/${id}`,
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_ITEM: (id) => `/admin/orders/${id}`,
  ADMIN_ORDER_STATUS: (orderId) => `/admin/orders/status/${orderId}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_ITEM: (id) => `/admin/users/${id}`,
  ADMIN_USER_BLOCK: (userId) => `/admin/users/${userId}/block`,
};
export default API_ROUTES;
