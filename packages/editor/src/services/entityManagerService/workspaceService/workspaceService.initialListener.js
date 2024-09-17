import store from "index";
import { createWorkspace, deleteWorkspace, editWorkspace } from "store/reducers/workspaceSlice";
import notificationHelper from "utils/ui/notificationHelper";

const workspaceInitialListener = (workspaceEvent) => {
  workspaceEvent.onCreateWorkspace((data) => {
    store.dispatch(createWorkspace(data.workspace));
    notificationHelper.success("Workspace created successfully");
  });
  workspaceEvent.onUpdateWorkspace((data) => {
    store.dispatch(editWorkspace(data.workspace));
    notificationHelper.success("Workspace updated successfully");
  });
  workspaceEvent.onDeleteWorkspace((data) => {
    store.dispatch(deleteWorkspace(data.workspaceId));
    notificationHelper.success("Workspace deleted successfully");
  });
};

export default workspaceInitialListener;
