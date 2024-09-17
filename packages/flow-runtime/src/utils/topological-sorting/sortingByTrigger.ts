import { Flow } from "../../flow/types";
import { Edge, Node } from "../../nodes/types";
import { dfsTopSort, dfsTopSortByTrigger } from "./dfs";

interface SortedFlowSystem {
  flow: string;
  nodes: {
    initial: Node[];
    [key: string]: Node[];
  };
  edges: Edge[];
}
interface SortedFlowSystemById {
  flow: string;
  nodes: {
    initial: Node[];
    [key: string]: Node[];
  };
  edges: Edge[];
}

export const topologicalSortingByLabel = (
  flowData: Flow,
): SortedFlowSystemById => {
  const { edges, flowId } = flowData;
  console.time("algorithm");
  const sortedFlowSystem: SortedFlowSystemById = {
    flow: "",
    nodes: {
      initial: [],
    },
    edges: [],
  };
  sortedFlowSystem.nodes.initial = dfsTopSort(flowData);
  const sortedByTrigger = dfsTopSortByTrigger(flowData);
  sortedFlowSystem.flow = flowId;
  sortedFlowSystem.nodes = { ...sortedFlowSystem.nodes, ...sortedByTrigger };
  // sortedFlowSystem.edges = edges.map((e) => e.id);
  sortedFlowSystem.edges = edges;
  console.timeEnd("algorithm");
  return sortedFlowSystem;
};
export const topologicalSorting = (flowData: Flow): SortedFlowSystem => {
  const { edges, flowId } = flowData;
  console.time("algorithm");
  const sortedFlowSystem: SortedFlowSystem = {
    flow: "",
    nodes: {
      initial: [],
    },
    edges: [],
  };
  sortedFlowSystem.nodes.initial = dfsTopSort(flowData);
  const sortedByTrigger = dfsTopSortByTrigger(flowData);
  sortedFlowSystem.flow = flowId;
  sortedFlowSystem.nodes = { ...sortedFlowSystem.nodes, ...sortedByTrigger };
  // sortedFlowSystem.edges = edges.map((e) => e.id);
  sortedFlowSystem.edges = edges;
  console.timeEnd("algorithm");
  return sortedFlowSystem;
};
