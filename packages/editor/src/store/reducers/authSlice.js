import AuthService from "services/authService/authService.http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  role: "user",
  isAuthenticated: false,
};

export const login = createAsyncThunk("auth/login", async (user) => {
  const { data } = await AuthService.logIn(user);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    makeMeOnline(state, { payload }) {
      state.isAuthenticated = true;
    },
    logOut(state, { payload }) {
      state.user = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) =>
      (state = {
        ...payload,
        isAuthenticated: true,
      }),
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
    },
  },
});
export const { makeMeOnline, logOut } = authSlice.actions;
export default authSlice.reducer;
