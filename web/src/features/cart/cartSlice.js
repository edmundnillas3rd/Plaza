import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    setItem: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = [...action.payload];
        return;
      }

      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const tempArray = [...state.items];
        tempArray[itemIndex].quantity = action.payload.quantity;

        state.items = tempArray;
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    reset: (state) => {
      state.items = [];
    }
  }
});

export const cart = cartSlice.actions;

export default cartSlice.reducer;
