import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleMenu = createAsyncThunk('toggleMenu', (isShow: boolean) => {
  return {
    data: { isShow },
  };
});
