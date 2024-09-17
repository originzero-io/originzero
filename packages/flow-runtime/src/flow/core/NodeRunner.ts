import { NodeList } from "../..";
import BaseNode from "../../nodes/BaseNode";
import { Edge, Node } from "../../nodes/types";
import { DerivedClassFrom } from "../../types/custom";
import { convertToPascalCase } from "../../utils/common/StringConversion";
import FlowObject from "./FlowObject";
import MessageManager from "../MessageManager";

class NodeRunner {
  static async runConstantsConcurrently(): Promise<void> {
    const constants = FlowObject.nodeInstances.filter(
      (node) => node.self.type === "CONSTANT"
    );
    await Promise.all(constants.map((constant) => constant.startNode()));
  }

  static async runTriggersConcurrently(): Promise<void> {
    const triggers = FlowObject.nodeInstances.filter(
      (node) => node.self.type === "TRIGGER"
    );
    await Promise.all(triggers.map((trigger) => trigger.startNode()));
  }

  static async runSpecificTrigger(trigger: Node): Promise<void> {
    const { nodeInstances } = FlowObject;
    const debuggedTrigger = nodeInstances.find(
      (nodeInstance) => nodeInstance.self.id === trigger.id
    );
    if (debuggedTrigger) {
      if (debuggedTrigger.self.data.configParameters) {
        // ! configParameters yapısındaki değişiklikler uygulanacak
        // debuggedTrigger.self.data.configParameters[0].groups[0].formData[0]. =
        //   trigger.data.configParameters?.message;
        // debuggedTrigger.self.data.configParameters.message =
        //   trigger.data.configParameters?.message;
      }
      debuggedTrigger.startNode();
    } else MessageManager.sendFlowError("Please debug the flow first.");
  }

  static async runOutgoersConcurrently(
    outgoers: BaseNode[],
    triggedBy: Node,
    outputEdges: Edge[]
  ): Promise<void> {
    await Promise.all(
      outgoers.map(async (outgoer) => {
        const targetEdges = outputEdges.find(
          (edge) => edge.target === outgoer.self.id
        );
        const targetHandle = targetEdges?.targetHandle;
        outgoer.startNode(triggedBy, targetHandle);
      })
    );
  }

  public static createNodeInstance(node: Node): BaseNode {
    const NodeClass: DerivedClassFrom<BaseNode> = NodeList[node.type].class;
    return new NodeClass(node);
  }

  //* Calls classes where placed in base folder and return relevant class instance
  private static async createNodeInstanceByFolder(
    node: Node,
    triggedBy: Node | null
  ): Promise<BaseNode> {
    const className = node.type;
    const pascalClassName = convertToPascalCase(className);
    const nodeModule = await import(`../base/${pascalClassName}.ts`);
    const NodeClass = nodeModule.default;
    return new NodeClass(node, triggedBy);
  }
}

export default NodeRunner;
