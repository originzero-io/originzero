import React, { useEffect } from "react";
import { useKeyPress, useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import notification from "utils/ui/notificationHelper";
import { setCopiedNodes } from "store/reducers/controlPanelSlice";
import { pasteNodes, selectAllElements } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";

const KeyboardEvents = () => {
  const dispatch = useDispatch();
  const { flowGui, flowElements } = useActiveFlow();
  const { copiedNodes } = useSelector((state) => state.controlPanel);
  const { paneClickPosition } = flowGui;

  const reactFlowInstance = useReactFlow();

  const f2Pressed = useKeyPress("F2");
  const ctrlAndAPressed = useKeyPress(["Control+a"]);
  const shiftAndRPressed = useKeyPress(["Shift+R"]);
  const ctrlAndCPressed = useKeyPress(["Control+c"]);
  const ctrlAndVPressed = useKeyPress(["Control+v"]);

  useEffect(() => {
    if (ctrlAndAPressed) {
      dispatch(selectAllElements());
    }
  }, [ctrlAndAPressed]);

  useEffect(() => {
    if (f2Pressed) {
      reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true });
    }
  }, [f2Pressed]);

  useEffect(() => {
    if (ctrlAndCPressed) {
      const selectedNodes = flowElements.nodes.filter((node) => node.selected);
      dispatch(setCopiedNodes(selectedNodes));
      notification.success(`${selectedNodes.length} nodes copied`, {
        icon: "👏",
        position: "top-center",
      });
    }
  }, [ctrlAndCPressed]);

  const getPosition = (index) => {
    const position = reactFlowInstance.project({
      x: paneClickPosition.x - index * 200 - 100,
      y: paneClickPosition.y,
    });
    return position;
  };

  useEffect(() => {
    if (ctrlAndVPressed) {
      const copiedNodesArray = copiedNodes.map((els, index) => ({
        ...els,
        id: uuid(),
        position: getPosition(index),
      }));
      dispatch(pasteNodes(copiedNodesArray));
    }
  }, [ctrlAndVPressed]);

  return null;
};
export default KeyboardEvents;
