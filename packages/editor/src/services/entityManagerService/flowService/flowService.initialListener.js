import store from "index";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import { createFlow, deleteFlow, editFlow, moveFlow } from "store/reducers/flow/flowSlice";
import notificationHelper from "utils/ui/notificationHelper";

const flowInitialListener = (flowEvent) => {
  flowEvent.onCreateFlow(async (data) => {
    const { auth, workspaces } = store.getState();

    store.dispatch(createFlow(data.flow));
    store.dispatch(
      getMyPermissionInThisWorkspace({
        workspace: workspaces.activeWorksapce,
        me: auth,
      }),
    );
    notificationHelper.success("Flow created successfully");
  });
  flowEvent.onUpdateFlow((data) => {
    store.dispatch(editFlow(data.flow));
    notificationHelper.success("Flow updated successfully");
  });
  flowEvent.onDeleteFlow((data) => {
    store.dispatch(deleteFlow(data.flowId));
    notificationHelper.success("Flow deleted successfully");
  });
  flowEvent.onMoveFlow((data) => {
    store.dispatch(moveFlow(data.flow));
    notificationHelper.success("Flow moved successfully");
  });
};
export default flowInitialListener;
