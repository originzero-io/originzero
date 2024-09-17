import { getIncomers } from "reactflow";
import { selectElements } from "store/reducers/flow/flowElementsSlice";
import store from "index";

export function backendFlowDataBuilder({ flowId, elements }) {
  console.log("FLOWID: ", flowId);
  console.log("ELEMENTS: ", elements);
  const flowBackendData = {
    id: flowId,
    nodes: elements.nodes.map((node) => {
      const { id, type, data } = node;
      const { ui, ...rest } = data;
      return {
        id,
        type,
        data: {
          ...rest,
        },
      };
    }),
    edges: elements.edges.map((edge) => {
      const { group, style, type, ...rest } = edge;
      return {
        ...rest,
      };
    }),
  };
  return flowBackendData;
}

export function findNodeById(nodeId, elements) {
  return elements.nodes.find((node) => node.id === nodeId);
}
function addIncomersToArray(node, elements, dependencyArray) {
  const { nodes, edges } = elements;
  const currentNodeIncomers = getIncomers(node, nodes, edges);
  if (currentNodeIncomers.length === 0) {
  } else {
    currentNodeIncomers.forEach((childIncomer) => {
      dependencyArray.push(childIncomer);
      addIncomersToArray(childIncomer, elements, dependencyArray);
    });
  }
}
export function isConnectionCyclic(elements, params) {
  const { source, target } = params;
  const dependencyArray = [];
  const sourceNode = findNodeById(source, elements);
  addIncomersToArray(sourceNode, elements, dependencyArray);
  store.dispatch(selectElements(dependencyArray));
  return dependencyArray.some((d) => d.id === target);
}
