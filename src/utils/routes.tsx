// Route path constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  DASHBOARD: '/dashboard',
};

export const AUTH_API_ROUTES = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  PROFILE: '/auth/profile',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
};

// Define route constants for navigation
export const ROUTE_PATHS = {
  HOME: ROUTES.HOME,
  LOGIN: ROUTES.LOGIN,
  PRODUCTS: ROUTES.PRODUCTS,
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  DASHBOARD: ROUTES.DASHBOARD,
};

