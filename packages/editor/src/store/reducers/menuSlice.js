import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  x: 0,
  y: 0,
  element: {},
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    panelMenu: initialState,
    multiSelectionMenu: initialState,
    elementMenu: initialState,
    groupMenu: initialState,
    nodeConfigurationMenu: initialState,
  },
  reducers: {
    setPanelContextMenu(state, { payload }) {
      state.panelMenu = payload;
    },
    setElementContextMenu(state, { payload }) {
      state.elementMenu = payload;
    },
    setMultiSelectionContextMenu(state, { payload }) {
      state.multiSelectionMenu = payload;
    },
    toggleNodeConfigurationMenu(state, { payload }) {
      state.nodeConfigurationMenu.state = payload.state;
      state.nodeConfigurationMenu.element = payload.element;
    },
    setGroupMenu(state, { payload }) {
      state.groupMenu = payload;
    },
  },
});

export const {
  setPanelContextMenu,
  setElementContextMenu,
  setMultiSelectionContextMenu,
  toggleNodeConfigurationMenu,
  setGroupMenu,
} = menuSlice.actions;
export default menuSlice.reducer;
