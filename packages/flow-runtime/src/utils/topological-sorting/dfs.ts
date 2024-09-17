/* eslint-disable no-restricted-syntax */
import { Flow } from "../../flow/types";
import { getOutgoers } from "../../nodes/helpers/node-helpers";
import { Node } from "../../nodes/types";

interface SortedFlowByTrigger {
  [triggerName: string]: Node[];
}

const dfsTopSortTriggerHelper = (
  triggerNode: Node,
  currentNode: Node,
  visited: Node[],
  sortedFlowByTrigger: SortedFlowByTrigger,
  flowData: Flow,
): void => {
  visited.push(currentNode);
  const outgoers = getOutgoers(currentNode, flowData.nodes, flowData.edges);
  for (const outgoer of outgoers) {
    if (!visited.includes(outgoer)) {
      dfsTopSortTriggerHelper(
        triggerNode,
        outgoer,
        visited,
        sortedFlowByTrigger,
        flowData,
      );
    }
  }
  if (currentNode.id !== triggerNode.id) {
    sortedFlowByTrigger[triggerNode.id].unshift(currentNode);
  }
};

export const dfsTopSortByTrigger = (flowData: Flow): SortedFlowByTrigger => {
  const triggerNodes = flowData.nodes.filter((node) => node.type === "TRIGGER");
  let visited: Node[] = [];
  const sortedFlowByTrigger: SortedFlowByTrigger = {};

  for (const trigger of triggerNodes) {
    sortedFlowByTrigger[trigger.id] = [];
    visited = [];
    dfsTopSortTriggerHelper(
      trigger,
      trigger,
      visited,
      sortedFlowByTrigger,
      flowData,
    );
  }
  return sortedFlowByTrigger;
};

const dfsTopSortHelper = (
  currentNode: Node,
  visited: Node[],
  sortedFlow: Node[],
  flowData: Flow,
): void => {
  visited.push(currentNode);
  const outgoers = getOutgoers(currentNode, flowData.nodes, flowData.edges);
  for (const outgoer of outgoers) {
    if (!visited.some((v) => v.id === outgoer.id)) {
      dfsTopSortHelper(outgoer, visited, sortedFlow, flowData);
    }
  }
  sortedFlow.unshift(currentNode);
};

export const dfsTopSort = (flowData: Flow): Node[] => {
  const { nodes } = flowData;
  const visited: Node[] = [];
  const sortedFlow: Node[] = [];
  for (const node of nodes) {
    if (!visited.some((v) => v.id === node.id)) {
      dfsTopSortHelper(node, visited, sortedFlow, flowData);
    }
  }
  return sortedFlow;
};
