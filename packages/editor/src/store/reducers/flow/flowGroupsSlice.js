import FlowGroupService from "services/entityManagerService/flowGroupService/flowGroupService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import flowElementsSlice, { deleteGroupOfElement, updateGroupOfElement } from "./flowElementsSlice";

export const getGroups = createAsyncThunk(
  "groups/get",
  async (flow_id) => await FlowGroupService.getGroups(flow_id),
);
export const createGroup = createAsyncThunk(
  "groups/create",
  async ({ flowId, group }) => await FlowGroupService.createGroup(flowId, group),
);
export const updateGroup = createAsyncThunk("groups/update", async (currentGroup, thunkApi) => {
  thunkApi.dispatch(updateGroupOfElement(currentGroup));
  return await FlowGroupService.updateGroup(currentGroup);
});
export const deleteGroup = createAsyncThunk("groups/delete", async (group, thunkApi) => {
  thunkApi.dispatch(deleteGroupOfElement(group._id));
  return await FlowGroupService.deleteGroup(group);
});

export const flowGroupsSlice = createSlice({
  name: "flowGroups",
  initialState: [],
  extraReducers: {
    [getGroups.fulfilled]: (state, { payload }) => payload,
    [createGroup.fulfilled]: (state, { payload }) => {
      state.push(payload);
    },
    [updateGroup.fulfilled]: (state, { payload }) => {
      const group = payload;
      const index = state.findIndex((s) => s._id === group._id);
      state[index] = group;
    },
    [deleteGroup.fulfilled]: (state, { payload }) => {
      const group = payload;
      return state.filter((s) => s._id !== group._id);
    },
  },
});

export default flowGroupsSlice.reducer;
