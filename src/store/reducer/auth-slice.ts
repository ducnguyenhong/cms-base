import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'types/auth.type';
import { login } from '../action/auth-action';

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user_info');
      localStorage.removeItem('user_token');
      localStorage.removeItem('refresh_token');
      state.token = undefined;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('user_token', action.payload.data.token);
        localStorage.setItem('refresh_token', action.payload.data.refreshToken);
        localStorage.setItem('user_info', JSON.stringify(action.payload.data.userInfo));
        state.request = {
          loading: false,
        };
        state.token = action.payload.data.token;
        state.user = action.payload.data.userInfo;
      })
      .addCase(login.pending, (state, action) => {
        state.request = {
          loading: true,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.request = {
          loading: false,
          error: action.error.message,
        };
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
