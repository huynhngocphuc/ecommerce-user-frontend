// Route path constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  DASHBOARD: '/dashboard',
};

// Define route constants for navigation
export const ROUTE_PATHS = {
  HOME: ROUTES.HOME,
  LOGIN: ROUTES.LOGIN,
  PRODUCTS: ROUTES.PRODUCTS,
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  DASHBOARD: ROUTES.DASHBOARD,
};

