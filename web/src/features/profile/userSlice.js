import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    isLogin: false
  },
  reducers: {
    setID: (state, action) => {
      state.id = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload;
    },
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    }
  }
});

export const user = userSlice.actions;

export default userSlice.reducer;
