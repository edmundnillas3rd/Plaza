import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    isLogin: false
  },
  reducers: {
    setID: (state, action) => {
      state.id = action.payload;
    },
    setUser: (state, action) => {
      state.name = action.payload;
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
