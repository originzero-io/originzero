import { createSlice } from "@reduxjs/toolkit";

const INITIAL_GUI = {
  viewport: { x: 0, y: 0, zoom: 1 },
  miniMapDisplay: true,
  groupBarDisplay: false,
  edgeType: "step",
  theme: "dark",
  nodeGroupMenuDisplay: false,
  paneClickPosition: { x: 0, y: 0 },
};

const flowGuiSlice = createSlice({
  name: "flowGui",
  initialState: INITIAL_GUI,
  reducers: {
    resetActiveFlowGui(state) {
      return INITIAL_GUI;
    },
    setActiveFlowGui(state, { payload }) {
      return payload;
    },
    setPaneClickPosition(state, { payload }) {
      state.paneClickPosition = payload;
    },
    setTheme(state, { payload }) {
      state.theme = payload;
    },
    setMiniMapDisplay(state, { payload }) {
      state.miniMapDisplay = payload;
    },
    setFlowEdgeType(state, { payload }) {
      state.edgeType = payload;
    },
    setGroupBarDisplay(state, { payload }) {
      state.groupBarDisplay = payload;
    },
    closeAllNodeGroupMenu(state, { payload }) {
      state.nodeGroupMenuDisplay = payload;
    },
  },
});

export default flowGuiSlice.reducer;
export const {
  resetActiveFlowGui,
  setActiveFlowGui,
  setPaneClickPosition,
  setReactFlowInstance,
  setTheme,
  setMiniMapDisplay,
  setFlowEdgeType,
  setGroupBarDisplay,
  closeAllNodeGroupMenu,
} = flowGuiSlice.actions;
