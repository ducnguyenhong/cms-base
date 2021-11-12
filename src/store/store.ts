import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './reducer/auth-slice';
import { menuSlice } from './reducer/menu-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    menu: menuSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
