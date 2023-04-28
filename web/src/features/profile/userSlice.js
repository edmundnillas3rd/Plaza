import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogin: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state) => {
      state.isLogin = true;
    },
    logoutUser: (state) => {
      state.isLogin = false;
    }
  }
});

export const { setUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
