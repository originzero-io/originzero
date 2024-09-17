import { createSlice } from "@reduxjs/toolkit";

export const controlPanelSlice = createSlice({
  name: "controlPanelReducer",
  initialState: {
    activeProject: {},
    copiedNodes: [],
    selectedFlow: {},
    showNavigationMenu: true,
  },
  reducers: {
    setCopiedNodes(state, { payload }) {
      state.copiedNodes = payload;
    },
    selectFlow(state, { payload }) {
      state.selectedFlow = payload;
    },
    setShowNavigationMenu(state, { payload }) {
      state.showNavigationMenu = payload;
    },
  },
});

export const { setCopiedNodes, selectFlow, setShowNavigationMenu } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;
