import { createSlice } from "@reduxjs/toolkit";

export const flowConfigSlice = createSlice({
  name: "flowConfig",
  initialState: {},
  reducers: {
    setActiveFlowConfig(state, { payload }) {
      return payload;
    },
    resetActiveFlowConfig(state, { payload }) {
      return {};
    },
  },
});

export default flowConfigSlice.reducer;
export const { setActiveFlowConfig, resetActiveFlowConfig } = flowConfigSlice.actions;
