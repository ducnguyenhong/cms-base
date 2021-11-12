import { createSlice } from '@reduxjs/toolkit';
import { toggleMenu } from '../action/menu-action';

export interface MenuState {
  isShow?: boolean;
}

export const initialState: MenuState = {
  isShow: (() => {
    if (localStorage.getItem('menu_open') === 'false') {
      return false;
    }
    return true;
  })(),
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleMenu.fulfilled, (state, action) => {
      localStorage.setItem('menu_open', `${action.payload.data.isShow}`);
      state.isShow = action.payload.data.isShow;
    });
  },
});
