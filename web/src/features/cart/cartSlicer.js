import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    setItem: (state, action) => {
      state.items = [...state.items, action.payload];
    }
  }
});

export const cart = cartSlice.actions;

export default cartSlice.reducer;
