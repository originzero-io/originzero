import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, { useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { setPaneClickPosition, closeAllNodeGroupMenu } from "store/reducers/flow/flowGuiSlice";
import {
  addNewNode,
  addNewEdge,
  setNodes,
  setEdges,
  setNodeEnable,
  updateEdgePath,
  deSyncNode,
} from "store/reducers/flow/flowElementsSlice";
import {
  setElementContextMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "store/reducers/menuSlice";
import PropTypes from "prop-types";
import useActiveFlow from "utils/hooks/useActiveFlow";
import notification from "utils/ui/notificationHelper";
import { isConnectionCyclic } from "components/FlowEditor/helpers/flowHelper";
import themeColor from "components/Shared/ThemeReference";
import notificationHelper from "utils/ui/notificationHelper";
import { useFlowContext } from "context/FlowDataProvider";
import {
  openElementContextMenu,
  openMultiSelectionContextMenu,
  openPaneContextMenu,
} from "./helpers/menuHelper";
import FlowUtils from "./components/FlowUtils/FlowUtils";
import { createNode, isHandleAlreadyConnected } from "./helpers/elementHelper";
import { createCustomNodeObject } from "./helpers/nodeObjectHelper";

const propTypes = {
  reactFlowWrapper: PropTypes.object.isRequired,
};
export default function FlowEditor({ reactFlowWrapper }) {
  const dispatch = useDispatch();

  const { flowElements, flowGui } = useActiveFlow();
  const { edgeType, theme } = flowGui;

  const nodeList = useSelector((state) => state.systemNodes);
  const reactFlowInstance = useReactFlow();

  const { setSyncedFlow } = useFlowContext();

  useEffect(() => {
    reactFlowInstance.setViewport(flowGui.viewport);
  }, [reactFlowInstance, flowGui.viewport]);

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(setNodes(changes));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(setEdges(changes));
    },
    [setEdges],
  );

  const onNodesDelete = useCallback((deletedNode) => {
    setSyncedFlow(false);
  }, []);

  const onEdgesDelete = useCallback((deletedEdge) => {
    setSyncedFlow(false);
  }, []);

  const onConnect = useCallback(
    (params) => {
      console.log("params: ", params);
      if (params.source === params.target) {
        notification.error("Nodes cannot connect itself");
      } else if (isHandleAlreadyConnected(params, flowElements.edges)) {
        notificationHelper.error("One handle should have only one connection");
      } else {
        const sourceGroup = flowElements.nodes.find((els) => els.id === params.source).data.ui
          ?.group;
        const edge = {
          ...params,
          type: edgeType,
          group: sourceGroup,
          style: { stroke: sourceGroup?.color, strokeWidth: "2px" },
          data: null,
        };

        const sourceEnable = flowElements.nodes.find((els) => els.id === params.source).data.enable;
        const self = flowElements.nodes.find((els) => els.id === params.target);
        dispatch(addNewEdge(edge));
        dispatch(setNodeEnable({ self, checked: sourceEnable }));
        setSyncedFlow(false);
      }
    },
    [addNewEdge, flowElements],
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      if (newConnection.source === newConnection.target) {
        notification.error("Nodes cannot connect itself");
      } else {
        dispatch(updateEdgePath({ oldEdge, newConnection }));
        setSyncedFlow(false);
      }
    },
    [updateEdgePath, flowElements],
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const initialPosition = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 300,
      y: event.clientY - reactFlowBounds.top,
    });

    if (!(type === "")) {
      const newNode = createNode(type, initialPosition);
      dispatch(addNewNode(newNode));
      setSyncedFlow(false);
    }
  };

  const onNodeContextMenu = (event, node) => openElementContextMenu(event, node);

  const onPaneContextMenu = (event) => openPaneContextMenu(event);

  const onSelectionContextMenu = (event) => openMultiSelectionContextMenu(event);

  const onDoubleClick = () => {
    // dispatch(setPanelContextMenu(false));
  };
  const onPaneClick = (event) => {
    dispatch(setPaneClickPosition({ x: event.clientX, y: event.clientY }));
    dispatch(setMultiSelectionContextMenu(false));
    dispatch(setElementContextMenu(false));
    dispatch(closeAllNodeGroupMenu(true));
  };

  const flowStyle = {
    background: themeColor[theme].paneBackground,
  };
  const customNodes = useMemo(() => createCustomNodeObject(nodeList), [nodeList]);

  return (
    <ReactFlow
      nodeTypes={customNodes}
      style={flowStyle}
      nodes={flowElements.nodes}
      edges={flowElements.edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onEdgesDelete={onEdgesDelete}
      onConnect={onConnect}
      onDrop={onDrop}
      onDoubleClick={onDoubleClick}
      onPaneContextMenu={onPaneContextMenu}
      onPaneClick={onPaneClick}
      onSelectionContextMenu={onSelectionContextMenu}
      onNodeContextMenu={onNodeContextMenu}
      onEdgeContextMenu={onNodeContextMenu}
      onDragOver={onDragOver}
      onEdgeUpdate={onEdgeUpdate}
      deleteKeyCode={["Delete"]}
      multiSelectionKeyCode={["Control"]}
      minZoom={0.3}
      maxZoom={4}
      zoomOnDoubleClick={false}
      connectionLineStyle={{ stroke: "rgb(22,139,63)", strokeWidth: "2px" }}
      attributionPosition="bottom-left"
    >
      <FlowUtils flowGui={flowGui} />
    </ReactFlow>
  );
}

FlowEditor.propTypes = propTypes;
