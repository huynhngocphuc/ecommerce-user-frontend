// src/redux/products/productSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/productsApi';
import { Product, ProductsResponse } from './type';

interface ProductsState {
  loading: boolean;
  items: Product[];
  error: string | null;
  total: number;
}

const initialState: ProductsState = {
  loading: false,
  items: [],
  error: null,
  total: 0,
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  { page?: number; limit?: number } | undefined
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
