/* eslint-disable no-underscore-dangle */
import BaseNode from "../../nodes/BaseNode";
import { Edge } from "../../nodes/types";
import { Flow } from "../types";

class FlowObject {
  private static _edges: Flow["edges"];

  private static _nodeInstances: BaseNode[] = [];

  static get nodeInstances(): BaseNode[] {
    return FlowObject._nodeInstances;
  }

  static set nodeInstances(nodeInstances: BaseNode[]) {
    FlowObject._nodeInstances = nodeInstances;
  }

  static get edges(): Edge[] {
    return FlowObject._edges;
  }

  static set edges(edges: Edge[]) {
    FlowObject._edges = edges;
  }
}

export default FlowObject;
