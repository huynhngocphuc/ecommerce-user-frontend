// src/redux/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getProfileApi,
  loginApi,
  logoutApi,
  refreshSessionApi,
  verifySessionApi,
} from '../../api/authApi';
import { AuthState, User } from './type';

const isUnauthorizedError = (error: any): boolean => {
  return error?.code === 401 || error?.response?.status === 401;
};

const resolveErrorMessage = (error: any, fallback: string): string => {
  return error?.message || error?.response?.data?.message || fallback;
};

const initialState: AuthState = {
  user: null,
  sessionStatus: 'unknown',
  isLoading: false,
  isRefreshing: false,
  lastVerifiedAt: null,
  failureReason: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      if (data) {
        return data;
      }

      const profile = await getProfileApi();
      return profile;
    } catch (err: any) {
      return rejectWithValue(resolveErrorMessage(err, 'Login failed'));
    }
  }
);

export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, { rejectWithValue }) => {
    try {
      await refreshSessionApi();
      await verifySessionApi();
      const profile = await getProfileApi();
      return profile;
    } catch (err: any) {
      return rejectWithValue(resolveErrorMessage(err, 'Session refresh failed'));
    }
  }
);

export const bootstrapSession = createAsyncThunk(
  'auth/bootstrapSession',
  async (_, { rejectWithValue }) => {
    try {
      await verifySessionApi();
      const profile = await getProfileApi();
      return profile;
    } catch (err: any) {
      if (isUnauthorizedError(err)) {
        try {
          await refreshSessionApi();
          await verifySessionApi();
          const refreshedProfile = await getProfileApi();
          return refreshedProfile;
        } catch (refreshError: any) {
          return rejectWithValue(resolveErrorMessage(refreshError, 'Session bootstrap failed'));
        }
      }
      return rejectWithValue(resolveErrorMessage(err, 'Session bootstrap failed'));
    }
  }
);

export const logoutSession = createAsyncThunk(
  'auth/logoutSession',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (err: any) {
      return rejectWithValue(resolveErrorMessage(err, 'Logout failed'));
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSession(state) {
      state.user = null;
      state.sessionStatus = 'unauthenticated';
      state.isRefreshing = false;
      state.lastVerifiedAt = null;
      state.failureReason = null;
      state.error = null;
    },
    setAuthenticatedUser(state, action: { payload: User }) {
      state.user = action.payload;
      state.sessionStatus = 'authenticated';
      state.lastVerifiedAt = new Date().toISOString();
      state.error = null;
      state.failureReason = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.failureReason = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("🚀 ~ action:", action)
        state.isLoading = false;
        state.user = action.payload.data;
        state.sessionStatus = 'authenticated';
        state.lastVerifiedAt = new Date().toISOString();
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.failureReason = action.payload as string;
      })
      .addCase(bootstrapSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bootstrapSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.sessionStatus = 'authenticated';
        state.lastVerifiedAt = new Date().toISOString();
        state.error = null;
        state.failureReason = null;
      })
      .addCase(bootstrapSession.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.sessionStatus = 'unauthenticated';
        state.failureReason = action.payload as string;
      })
      .addCase(refreshSession.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.data;
        state.sessionStatus = 'authenticated';
        state.lastVerifiedAt = new Date().toISOString();
        state.error = null;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.isRefreshing = false;
        state.user = null;
        state.sessionStatus = 'unauthenticated';
        state.failureReason = action.payload as string;
      })
      .addCase(logoutSession.fulfilled, (state) => {
        state.user = null;
        state.sessionStatus = 'unauthenticated';
        state.isRefreshing = false;
        state.lastVerifiedAt = null;
      })
      .addCase(logoutSession.rejected, (state, action) => {
        state.user = null;
        state.sessionStatus = 'unauthenticated';
        state.failureReason = action.payload as string;
      });
  },
});

export const { clearSession, setAuthenticatedUser } = authSlice.actions;
export default authSlice.reducer;
