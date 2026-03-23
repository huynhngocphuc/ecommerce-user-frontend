export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
}

export interface ProductsState {
  loading: boolean;
  items: Product[];
  error: string | null;
  total: number;
}

export interface ProductSlice {
  state: ProductsState;
}
