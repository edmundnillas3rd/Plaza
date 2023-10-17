import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    contents: [],
    totalAmount: 0
  },
  reducers: {
    appendItem: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.contents = action.payload;
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart"));
      const duplicate = cart.find(content => content.item === action.payload.item);

      // ID is expected to be string
      if (duplicate !== undefined && typeof duplicate.item === "string")
        return;

      if (!!cart) {
        state.contents = [...cart, action.payload];
      } else {
        state.contents = [...state.contents, action.payload];
      }
      localStorage.setItem("cart", JSON.stringify(state.contents));
    },
    updateItem: (state, action) => {
      state.contents = [
        ...state.contents.map((itm) => {
          if (itm.id === action.payload.id) {
            return action.payload;
          }

          return itm;
        })
      ];
    },
    removeItem: (state, action) => {
      state.contents = state.contents.filter((itm) => {
        return itm.id !== action.payload.id;
      });

      localStorage.setItem("cart", JSON.stringify(state.contents));
    },
    getTotalAmount: (state) => {
      state.totalAmount = state.contents.reduce(
        (prevValue, currValue, currIndex, array) => {
          return prevValue + currValue.price * array[currIndex].quantity;
        },
        0
      );
    },
    reset: (state) => {
      state.contents = [];
    }
  }
});

export const { appendItem, updateItem, removeItem, getTotalAmount, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
