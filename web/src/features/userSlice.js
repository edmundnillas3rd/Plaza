import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    token: "",
    role: ""
  },

  reducers: {
    setUser: (state, payload) => {
      state.value = payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
