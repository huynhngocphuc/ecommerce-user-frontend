// Route path constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  NEW_ARRIVALS: '/new-arrivals',
  SALE: '/sale',
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
  NEW_ARRIVALS: ROUTES.NEW_ARRIVALS,
  SALE: ROUTES.SALE,
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  DASHBOARD: ROUTES.DASHBOARD,
};

export const HEADER_NAV_ITEMS = [
  { id: 'home', label: 'Home', path: ROUTES.HOME },
  { id: 'shop', label: 'Shop', path: ROUTES.PRODUCTS },
  { id: 'new-arrivals', label: 'New Arrivals', path: ROUTES.NEW_ARRIVALS },
  { id: 'sale', label: 'Sale', path: ROUTES.SALE },
] as const;

