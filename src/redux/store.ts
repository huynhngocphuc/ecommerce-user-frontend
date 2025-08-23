import { configureStore } from '@reduxjs/toolkit';

// Import các slice reducer ở đây nếu có
// import userReducer from '../features/auth/userSlice';
// import productReducer from '../features/products/productSlice';

const store = configureStore({
	reducer: {
		// user: userReducer,
		// products: productReducer,
	},
	// middleware, devTools, ... có thể thêm ở đây
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
