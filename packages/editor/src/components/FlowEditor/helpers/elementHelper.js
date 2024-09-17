import uuid from "react-uuid";
import { getNodeData } from "./nodeObjectHelper";

export const createNode = (type, initialPosition) => {
  const nodeData = getNodeData(type);
  //* if there is no type of this node then return default node
  return {
    id: `${type}-${uuid()}`,
    type,
    position: initialPosition,

    data: {
      ...nodeData,
      trigHandles: {
        trig1: true,
        trig2: false,
      },
      triggerAttributes: "ignore",
      statusHandles: {
        ...nodeData?.statusHandles,
        inputs: {
          enable: false,
          disable: false,
          ...nodeData?.statusHandles?.inputs,
        },
        outputs: {
          ...nodeData?.statusHandles?.outputs,
          error: false,
          errorVal: false,
        },
      },
      frozenHandles: [],
      enable: true,
      preferencesClass: "class1",
      syncedWithServer: false,
    },
    selected: false,
    // ? Reactflow tarafından eklenenler
    // width,
    // height,
    // selected,
    // positionAbsolute : {x,y},
    // dragging
  };
};

export const isEdgeExist = (newConnection, edges) =>
  edges.some(
    (edge) =>
      edge.source === newConnection.source &&
      edge.target === newConnection.target &&
      edge.sourceHandle === newConnection.sourceHandle &&
      edge.targetHandle === newConnection.targetHandle,
  );
export const isHandleAlreadyConnected = (newConnection, edges) => {
  const handleType = newConnection.targetHandle.split("_")[0];
  return edges.some(
    (edge) =>
      handleType !== "trig" &&
      handleType !== "status" &&
      edge.target === newConnection.target &&
      edge.targetHandle === newConnection.targetHandle,
  );
};

export const setSourceNodeColorToEdge = (connection, updatedEdges, nodes) => {
  const group = nodes.find((node) => node.id === connection.source)?.data.ui.group;
  const newEdges = updatedEdges.map((edge) => {
    if (edge.source === connection.source && edge.target === connection.target) {
      return {
        ...edge,
        group,
        style: {
          ...edge.style,
          stroke: group.color,
        },
      };
    }
    return edge;
  });
  return newEdges;
};

export const getSelectedNodes = (nodes) => nodes.filter((node) => node.selected === true);
