import { combineReducers } from "redux";
import flowElementsReducer from "./reducers/flow/flowElementsSlice";
import flowGroupsReducer from "./reducers/flow/flowGroupsSlice";
import flowConfigReducer from "./reducers/flow/flowConfigSlice";
import flowGuiReducer from "./reducers/flow/flowGuiSlice";
import flowReducer from "./reducers/flow/flowSlice";
import menuReducer from "./reducers/menuSlice";
import panelNodeListReducer from "./reducers/panelNodeListSlice";
import controlPanelReducer from "./reducers/controlPanelSlice";
import { modalReducer, loadingBarReducer } from "./reducers/componentSlice";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import userPermissionReducer from "./reducers/userPermissionSlice";
import authPermissionReducer from "./reducers/authPermissionSlice";
import workspaceReducer from "./reducers/workspaceSlice";
import projectReducer from "./reducers/projectSlice";
import notesReducer from "./reducers/noteSlice";
import systemNodeSlice from "./reducers/systemNodeSlice";

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  authPermissions: authPermissionReducer,
  userPermissions: userPermissionReducer,
  controlPanel: controlPanelReducer,
  workspaces: workspaceReducer,
  projects: projectReducer,
  flows: flowReducer,
  activeFlow: combineReducers({
    flowConfig: flowConfigReducer,
    flowGui: flowGuiReducer,
    flowElements: flowElementsReducer,
    flowGroups: flowGroupsReducer,
  }),
  systemNodes: systemNodeSlice,
  panelNodeList: panelNodeListReducer,
  notes: notesReducer,
  menus: menuReducer,
  modal: modalReducer,
  loadingBar: loadingBarReducer,
});

// resetting reducers after user log out
const rootReducer = (state, action) => {
  if (action.type === "auth/logOut" || action.type === "RESET") {
    state = undefined;
  }
  return reducers(state, action);
};
export default rootReducer;
