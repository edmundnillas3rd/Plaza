import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/Profile/userSlice";
import cartReducer from "../features/Cart/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
});
