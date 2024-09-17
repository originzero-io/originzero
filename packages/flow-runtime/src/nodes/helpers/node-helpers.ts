import { RFEdge, RFNode } from "../../types/react-flow";
import BaseNode from "../BaseNode";
import { IOValueType, Node } from "../types";

export const getHandleDataType = (handle: string): IOValueType =>
  handle.split("_")[0] as IOValueType;

export const getHandleName = (handle: string): string => handle.split("_")[1];

export const getIncomers = (
  node: Node,
  nodeInstances: BaseNode[],
  edges: RFEdge[],
): BaseNode[] => {
  const incomersIds = edges
    .filter((e) => e.target === node.id)
    .map((e) => e.source);
  return nodeInstances.filter((n) => incomersIds.includes(n.self.id));
};
