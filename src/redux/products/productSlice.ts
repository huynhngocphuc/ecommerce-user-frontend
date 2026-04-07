// src/redux/products/productSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/productsApi';
import { ProductListQuery } from '../../api/productsApi';
import { Pagination, Product, ProductsResponse } from './type';

interface ProductsState {
  loading: boolean;
  products: Product[];
  cartItems: Product[];
  error: string | null;
  pagination: Pagination;
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
    addToCart: (state, action: { payload: Product }) => {
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

export const { addToCart, removeFromCart, clearCart } = productSlice.actions;

export const selectCartCount = (state: { products: ProductsState }) =>
  state.products.cartItems.length;

export default productSlice.reducer;
