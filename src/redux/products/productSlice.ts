// src/redux/products/productSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/productsApi';
import { ProductListQuery } from '../../api/productsApi';
import { CartItem, Pagination, Product, ProductsResponse } from './type';

interface ProductDetailModalState {
  isOpen: boolean;
  productId: string | null;
}

interface ProductDetailState {
  loading: boolean;
  product: Product | null;
  error: string | null;
}

interface ProductsState {
  loading: boolean;
  products: Product[];
  cartItems: CartItem[];
  error: string | null;
  pagination: Pagination;
  productDetailModal: ProductDetailModalState;
  productDetail: ProductDetailState;
}

const initialState: ProductsState = {
  loading: false,
  products: [],
  cartItems: [],
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  },
  productDetailModal: {
    isOpen: false,
    productId: null,
  },
  productDetail: {
    loading: false,
    product: null,
    error: null,
  },
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  ProductListQuery | undefined
>(
  'products/fetchAll',
  async (query, { rejectWithValue }) => {
    try {
      const data = await getProducts(query);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Failed to fetch products');
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: CartItem }) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: { payload: string }) => {
      const index = state.cartItems.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.cartItems.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    openProductDetailModal: (state, action: { payload: string }) => {
      state.productDetailModal = {
        isOpen: true,
        productId: action.payload,
      };
    },
    closeProductDetailModal: (state) => {
      state.productDetailModal = {
        isOpen: false,
        productId: null,
      };
    },
    setProductDetailLoading: (state) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    setProductDetailSuccess: (state, action: { payload: Product }) => {
      state.productDetail.loading = false;
      state.productDetail.error = null;
      state.productDetail.product = action.payload;
    },
    setProductDetailError: (state, action: { payload: string }) => {
      state.productDetail.loading = false;
      state.productDetail.error = action.payload;
      state.productDetail.product = null;
    },
    clearProductDetail: (state) => {
      state.productDetail = {
        loading: false,
        product: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  openProductDetailModal,
  closeProductDetailModal,
  setProductDetailLoading,
  setProductDetailSuccess,
  setProductDetailError,
  clearProductDetail,
} = productSlice.actions;

export const selectCartCount = (state: { products: ProductsState }) =>
  state.products.cartItems.length;

export default productSlice.reducer;
