export interface ProductMedia {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface ProductVariantOption {
  value: string;
  label: string;
  available?: boolean;
  swatchHex?: string;
}

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
  media?: ProductMedia[];
  sizeOptions?: ProductVariantOption[];
  colorOptions?: ProductVariantOption[];
}

export interface CartItem extends Product {
  selectedSize?: string;
  selectedColor?: string;
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
  cartItems: CartItem[];
  error: string | null;
  total: number;
}

export interface ProductSlice {
  state: ProductsState;
}
