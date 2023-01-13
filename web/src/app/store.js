import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profile/userSlice";
import cartReducer from "../features/cart/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
});
