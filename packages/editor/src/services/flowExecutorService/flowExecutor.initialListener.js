import { setActiveFlowGui } from "store/reducers/flow/flowGuiSlice";
import store from "index";
import { setSystemNodes } from "store/reducers/systemNodeSlice";
import { setActiveFlowElements } from "store/reducers/flow/flowElementsSlice";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";

const flowExecutorInitialListener = (flowExecutorEvent) => {
  flowExecutorEvent.getNodeList((data) => {
    store.dispatch(beginTheBar());
    store.dispatch(setSystemNodes(data));
    store.dispatch(endTheBar());
  });

  flowExecutorEvent.getGUISettings((data) => {
    store.dispatch(setActiveFlowGui(data));
  });
  flowExecutorEvent.getElements((data) => {
    store.dispatch(setActiveFlowElements(data));
  });
};

export default flowExecutorInitialListener;
