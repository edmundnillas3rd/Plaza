import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/Profile/userSlice";

export default configureStore({
  reducer: {
    user: userReducer
  }
});
