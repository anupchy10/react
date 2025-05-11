// redux/detail/detailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
});

export const { setSelectedItem, clearSelectedItem } = detailSlice.actions;
export default detailSlice.reducer;