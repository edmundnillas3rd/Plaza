import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profile/userSlice";

export default configureStore({
  reducer: {
    user: userReducer
  }
});
