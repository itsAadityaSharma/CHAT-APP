import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.token = "";
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export const loggedInUser = (state) => state.user.userInfo;
export const loggedIntoken = (state) => state.user.token;

export default userSlice.reducer;
