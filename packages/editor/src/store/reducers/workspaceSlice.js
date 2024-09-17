import WorkspaceService from "services/entityManagerService/workspaceService/workspaceService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyWorkspaces = createAsyncThunk("workspaces/get", async () =>
  WorkspaceService.getMyWorkspaces(),
);

const initialState = {
  activeWorkspace: "",
  workspaces: [],
};
export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setActiveWorkspace(state, { payload }) {
      state.activeWorkspace = payload;
    },
    createWorkspace(state, { payload }) {
      state.workspaces.push(payload);
    },
    editWorkspace(state, { payload }) {
      const index = state.workspaces.findIndex((workspace) => workspace._id === payload._id);
      state.workspaces[index] = payload;
    },
    deleteWorkspace(state, { payload }) {
      state.workspaces = state.workspaces.filter((workspace) => workspace._id !== payload);
    },
  },
  extraReducers: {
    [getMyWorkspaces.fulfilled]: (state, { payload }) => {
      state.workspaces = payload;
    },
  },
});

export default workspaceSlice.reducer;
export const { setActiveWorkspace, createWorkspace, editWorkspace, deleteWorkspace } =
  workspaceSlice.actions;
