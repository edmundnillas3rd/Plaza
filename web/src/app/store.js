import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profile/userSlice";
import cartReducer from "../features/cart/cartSlicer";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
});
