import { RFConnection, RFNode, RFEdge } from "../../types/react-flow";

export const isEdge = (
  element: RFNode | RFConnection | RFEdge,
): element is RFEdge =>
  "id" in element && "source" in element && "target" in element;

export const isNode = (
  element: RFNode | RFConnection | RFEdge,
): element is RFNode =>
  "id" in element && !("source" in element) && !("target" in element);
