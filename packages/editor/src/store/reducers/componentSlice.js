import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: null,
  reducers: {
    setModal(state, { payload }) {
      return payload;
    },
  },
});

const loadingBarSlice = createSlice({
  name: "modal",
  initialState: { progress: 0 },
  reducers: {
    beginTheBar(state, { payload }) {
      const i = Math.floor(Math.random() * 40) + 10;
      state.progress = i;
    },
    endTheBar(state, { payload }) {
      state.progress = 100;
    },
  },
});

const modalReducer = modalSlice.reducer;
export { modalReducer };
export const { setModal } = modalSlice.actions;

const loadingBarReducer = loadingBarSlice.reducer;
export { loadingBarReducer };
export const { beginTheBar, endTheBar } = loadingBarSlice.actions;
