import PermissionService from "services/entityManagerService/permissionService/permissionService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { beginTheBar, endTheBar } from "./componentSlice";

export const defaultPermissions = {
  CAN_DO_EVERYTHING: true,
  device: {
    CAN_CREATE_CONTROLLER: true,
    CAN_CREATE_PROCESSOR: false,

    CAN_USAGE_CONTROLLER_ALL: false,
    CAN_USAGE_CONTROLLER: [],

    CAN_USAGE_PROCESSOR_ALL: false,
    CAN_USAGE_PROCESSOR: [],

    CAN_EDIT_CONTROLLER_ALL: false,
    CAN_EDIT_CONTROLLER: [],

    CAN_EDIT_PROCESSOR_ALL: false,
    CAN_EDIT_PROCESSOR: [],
  },
  project: {
    CAN_CREATE_PROJECT: false,
    CAN_CREATE_DASHBOARD_ALL: false,
    CAN_CREATE_DASHBOARD: [
      /* project_id */
    ],
    CAN_CREATE_FLOW_ALL: false,
    CAN_CREATE_FLOW: [
      /* project_id */
    ],
    CAN_USAGE_PROJECT_ALL: false,
    CAN_USAGE_PROJECT: [
      /* project_id */
    ],
    CAN_USAGE_FLOW_ALL: [
      /* project_id */
    ],
    CAN_USAGE_FLOW: [
      /* {id: flow_id projectId: project_id} */
    ],
    CAN_USAGE_DASHBOARD_ALL: [
      /* project_id */
    ],
    CAN_USAGE_DASHBOARD: [
      /* dashboard_id */
    ],
    CAN_EDIT_PROJECT_ALL: false,
    CAN_EDIT_PROJECT: [
      /* project_id */
    ],
    CAN_EDIT_FLOW_ALL: [
      /* project_id */
    ],
    CAN_EDIT_FLOW: [
      /* {id: flow_id projectId: project_id} */
    ],
    CAN_EDIT_DASHBOARD_ALL: [
      /* project_id */
    ],
    CAN_EDIT_DASHBOARD: [
      /* dashboard_id */
    ],
    CAN_EDIT_NODE: [
      /* node_id */
    ],
    CAN_VIEW_PROJECT_ALL: false,
    CAN_VIEW_PROJECT: [
      /* project_id */
    ],
    CAN_VIEW_FLOW_ALL: [
      /* project_id */
    ],
    CAN_VIEW_FLOW: [
      /* {id: flow_id projectId: project_id} */
    ],
    CAN_VIEW_DASHBOARD_ALL: [
      /* project_id */
    ],
    CAN_VIEW_DASHBOARD: [
      /* dashboard_id */
    ],
  },
  team: {
    CAN_INVITE_MEMBER: false,
    CAN_REMOVE_MEMBER: false,
    CAN_ASSIGN_PERMISSION: false,
  },
};

export const getUserPermissionInThisWorkspace = createAsyncThunk(
  "permissions/get_in_this_workspace",
  async ({ workspace, user }, thunkApi) => {
    thunkApi.dispatch(beginTheBar());
    const permission = await PermissionService.getUserPermissionInThisWorkspace(
      workspace._id,
      user._id,
    );
    thunkApi.dispatch(endTheBar());
    return permission;
  },
);

export const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState: defaultPermissions,
  reducers: {
    loadUserPermission(state, action) {
      return action.payload;
    },

    setCanDoEverythingPermission(state, action) {
      const event = action.payload;
      state.CAN_DO_EVERYTHING = event.target.checked;
    },

    //* PROJECT_CREATE ==> true/false
    setSinglePermission(state, action) {
      const { name } = action.payload.event.target;
      const { checked } = action.payload.event.target;
      const { permissionType } = action.payload;

      state[permissionType][name] = checked;
    },

    //* FLOW_CREATE ==> [...projects, projectId]
    setMultiplePermission(state, action) {
      const { id } = action.payload.event.target;
      const { name } = action.payload.event.target;
      const { checked } = action.payload.event.target;
      const { permissionType } = action.payload;

      if (checked) {
        state[permissionType][name].push(id);

        if (name === "CAN_EDIT_PROJECT") {
          if (
            !state.project.CAN_VIEW_PROJECT.includes(id) &&
            !state.project.CAN_USAGE_PROJECT.includes(id)
          ) {
            state.project.CAN_VIEW_PROJECT.push(id);
            state.project.CAN_USAGE_PROJECT.push(id);
          } else if (!state.project.CAN_USAGE_PROJECT.includes(id)) {
            state.project.CAN_USAGE_PROJECT.push(id);
          } else if (!state.project.CAN_VIEW_PROJECT.includes(id)) {
            state.project.CAN_VIEW_PROJECT.push(id);
          }
        }
      } else if (!checked) {
        state[permissionType][name] = state[permissionType][name].filter((p) => p !== id);
        state[permissionType][`${name}_ALL`] = false;

        if (name === "CAN_EDIT_PROJECT") {
          state.project.CAN_VIEW_PROJECT = state.project.CAN_VIEW_PROJECT.filter((p) => p !== id);
          state.project.CAN_USAGE_PROJECT = state.project.CAN_USAGE_PROJECT.filter((p) => p !== id);
        }
      }
    },

    //* PROJECT_FLOW_FLOWID ==> [{flowId: x, projectId: y}]
    setNestedMultiplePermission(state, action) {
      const { name } = action.payload.event.target;
      const { checked } = action.payload.event.target;

      const { flowData } = action.payload;
      const { permissionType } = action.payload;

      if (checked) {
        state[permissionType][name].push(flowData);
        if (
          name === "CAN_EDIT_FLOW" &&
          !state.project.CAN_VIEW_FLOW.some((p) => p.flowId === flowData.flowId)
        ) {
          if (
            !state.project.CAN_VIEW_FLOW.some((p) => p.flowId === flowData.flowId) &&
            !state.project.CAN_USAGE_FLOW.some((p) => p.flowId === flowData.flowId)
          ) {
            state.project.CAN_VIEW_FLOW.push(flowData);
            state.project.CAN_USAGE_FLOW.push(flowData);
          } else if (!state.project.CAN_USAGE_FLOW.some((p) => p.flowId === flowData.flowId)) {
            state.project.CAN_USAGE_FLOW.push(flowData);
          } else if (!state.project.CAN_VIEW_FLOW.some((p) => p.flowId === flowData.flowId)) {
            state.project.CAN_VIEW_FLOW.push(flowData);
          }
        }
      } else if (!checked) {
        state[permissionType][name] = state[permissionType][name].filter(
          (p) => p.flowId !== flowData.flowId,
        );
        state[permissionType][`${name}_ALL`] = state[permissionType][`${name}_ALL`].filter(
          (p) => p !== flowData.projectId,
        );

        if (name === "CAN_EDIT_FLOW") {
          state.project.CAN_VIEW_FLOW = state.project.CAN_VIEW_FLOW.filter(
            (p) => p.flowId !== flowData.flowId,
          );
          state.project.CAN_USAGE_FLOW = state.project.CAN_USAGE_FLOW.filter(
            (p) => p.flowId !== flowData.flowId,
          );
        }
      }
    },

    //* PROJECT_ALL ==> true/false
    setSingleAllPermission(state, action) {
      const { name } = action.payload.event.target;
      const { checked } = action.payload.event.target;
      const { permissionType } = action.payload;

      if (checked) {
        state[permissionType][`${name}_ALL`] = true;

        if (name === "CAN_EDIT_PROJECT") {
          state.project.CAN_VIEW_PROJECT_ALL = true;
          state.project.CAN_USAGE_PROJECT_ALL = true;
        }
      } else if (!checked) {
        state[permissionType][`${name}_ALL`] = false;

        if (name === "CAN_EDIT_PROJECT") {
          state.project.CAN_VIEW_PROJECT_ALL = false;
          state.project.CAN_USAGE_PROJECT_ALL = false;
        }
      }
    },

    //* PROJECT_FLOW_ALL ==> [flow_id]
    setNestedAllPermission(state, action) {
      const { id } = action.payload.event.target; // projectId
      const { name } = action.payload.event.target;
      const { checked } = action.payload.event.target;
      const { permissionType } = action.payload;

      if (checked) {
        state[permissionType][`${name}_ALL`].push(id);

        if (name === "CAN_EDIT_FLOW") {
          if (
            !state.project.CAN_VIEW_FLOW_ALL.includes(id) &&
            !state.project.CAN_USAGE_FLOW_ALL.includes(id)
          ) {
            state.project.CAN_VIEW_FLOW_ALL.push(id);
            state.project.CAN_USAGE_FLOW_ALL.push(id);
          } else if (!state.project.CAN_VIEW_FLOW_ALL.includes(id)) {
            state.project.CAN_VIEW_FLOW_ALL.push(id);
          } else if (!state.project.CAN_USAGE_FLOW_ALL.includes(id)) {
            state.project.CAN_USAGE_FLOW_ALL.push(id);
          }
        }
      } else if (!checked) {
        state[permissionType][`${name}_ALL`] = state[permissionType][`${name}_ALL`].filter(
          (p) => p !== id,
        );

        if (name === "CAN_EDIT_FLOW") {
          state.project.CAN_VIEW_FLOW_ALL = state.project.CAN_VIEW_FLOW_ALL.filter((p) => p !== id);
          state.project.CAN_USAGE_FLOW_ALL = state.project.CAN_USAGE_FLOW_ALL.filter(
            (p) => p !== id,
          );
        }
      }
    },
  },
  extraReducers: {
    [getUserPermissionInThisWorkspace.fulfilled]: (state, { payload }) => {
      console.log("user permissions: ", payload);
      if (payload) {
        return payload.permissions;
      }
    },
  },
});

export default userPermissionSlice.reducer;
export const {
  loadUserPermission,
  setCanDoEverythingPermission,
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setNestedAllPermission,
} = userPermissionSlice.actions;
