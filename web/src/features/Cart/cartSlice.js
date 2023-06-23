import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    contents: []
  },
  reducers: {
    appendItem: (state, action) => {
      state.contents = [...state.contents, action.payload];
    },
    updateItem: (state, action) => {
      state.contents = [...state.contents.map((itm) => {
        
        if (itm.id === action.payload.id) {
          return action.payload;
        }

        return itm;
      })]
    },
    removeItem: (state, action) => {
      state.contents = state.contents.filter(itm => {
        return itm.id !== action.payload.id;
      })
    }
  }
});

export const { appendItem, updateItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
