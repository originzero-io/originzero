import ProjectService from "services/entityManagerService/projectService/projectService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProjectsByWorkspace = createAsyncThunk(
  "projects/getByWorkspaces",
  async (workspace) => await ProjectService.getProjectsByWorkspace(workspace),
);

const initialState = {
  activeProject: "",
  projects: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setActiveProject(state, { payload }) {
      state.activeProject = payload;
    },
    createProject(state, { payload }) {
      state.projects.push(payload);
    },
    updateProject(state, { payload }) {
      const index = state.projects.findIndex((project) => project._id === payload._id);
      state.projects[index] = payload;
    },
    deleteProject(state, { payload }) {
      state.projects = state.projects.filter((project) => project._id !== payload);
    },
  },
  extraReducers: {
    [getProjectsByWorkspace.fulfilled]: (state, { payload }) => {
      state.projects = payload;
    },
  },
});

export default projectSlice.reducer;
export const { setActiveProject, createProject, updateProject, deleteProject } =
  projectSlice.actions;
