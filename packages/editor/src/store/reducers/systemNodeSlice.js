import { createSlice } from "@reduxjs/toolkit";

export const systemNodeSlice = createSlice({
  name: "systemNodes",
  initialState: {},
  reducers: {
    setSystemNodes(state, { payload }) {
      return payload;
    },
  },
});

export const { setSystemNodes } = systemNodeSlice.actions;

export default systemNodeSlice.reducer;
