export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  size?: string;
  color?: string;
  brand?: string;
  style?: string;
}
export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
export interface ProductsStructure {
  products: Product[];
  total: number;
  pagination: Pagination;
}

export interface ProductsResponse {
  data: ProductsStructure;
  message: string;
}

export interface ProductsState {
  loading: boolean;
  products: Product[];
  cartItems: Product[];
  error: string | null;
  total: number;
}

export interface ProductSlice {
  state: ProductsState;
}
