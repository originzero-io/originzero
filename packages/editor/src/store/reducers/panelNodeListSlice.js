import { createSlice } from "@reduxjs/toolkit";
import { createPanelNodeList } from "components/FlowEditor/helpers/nodeObjectHelper";

// const panelNodeList = await createPanelNodeList();

export const panelNodeListSlice = createSlice({
  name: "panelNodeListReducer",
  initialState: [],
  reducers: {
    loadPanelNodeList(state, { payload }) {
      return createPanelNodeList();
    },
    setNodeList(state, { payload }) {
      return payload;
    },
    addNodeToFavorites(state, { payload }) {
      return state.map((node) => (node.id === payload.id ? { ...node, fav: !node.fav } : node));
    },
  },
});

export default panelNodeListSlice.reducer;
export const { setNodeList, addNodeToFavorites, loadPanelNodeList } = panelNodeListSlice.actions;
