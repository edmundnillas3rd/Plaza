import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../app/userSlice";

export default configureStore({
  reducer: {
    userReducer
  }
});
