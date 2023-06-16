import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    token: "",
    role: ""
  },

  reducers: {
    setUser: (state, action) => {
      state.id = action.payload?.id;
      state.username = action.payload?.name;
      state.token = action.payload?.token;
      state.role = "user";
    },
    resetUser(state) {
      state.id = "";
      state.username = "";
      state.token = "";
      state.role = "";
    }
  }
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
