import { Node } from "../../nodes/types";
import IntervalUtil from "../../utils/common/IntervalUtil";
import FlowObject from "./FlowObject";
import NodeRunner from "./NodeRunner";
import { Flow } from "../types";
import IConnection from "../connections/IConnection";
// import MqttConnectionManager from "../connections/MqttConnectionManager";

/*
  FlowStarter class responsible for:
  - fills FlowObject with flow data and runs operation.
  - keep connection information and manage this connections initially
*/

class FlowStarter {
  static communicationProtocols: IConnection[] = []; // mqtt or modbus instances

  // static setup(flow: Flow, communicationProtocols: IConnection[]) {
  //   this.stop();
  //   FlowObject.edges = flow.edges;

  //   FlowStarter.communicationProtocols = [...communicationProtocols];

  //   const mqttNodes = flow.nodes.filter(
  //     (node) =>
  //       node.type.includes("MQTT") ||
  //       node.type.includes("VELOCITY") ||
  //       node.type.includes("POSITION")
  //   );
  //   if (mqttNodes.length > 0) {
  //     MqttConnectionManager.getInstance().establishConnectionByNodes(mqttNodes);
  //   }

  //   // oluşturulan flowun node classlarından instance yarat
  //   flow.nodes.forEach((node) => {
  //     FlowObject.nodeInstances.push(NodeRunner.createNodeInstance(node));
  //   });
  // }

  static async initialStart(flow: Flow) {
    // ! configParameters yapısındaki değişiklikler uygulanınca comment kaldırılacak

    // this.setup(flow, [MqttConnectionManager.getInstance()]);

    FlowObject.nodeInstances.forEach((nodeInstance) => {
      nodeInstance.startNodeManagers();
    });

    await NodeRunner.runConstantsConcurrently();
  }

  static startByTrigger(trigger: Node) {
    NodeRunner.runSpecificTrigger(trigger);
  }

  static stop() {
    IntervalUtil.clearIntervals();
    FlowStarter.communicationProtocols.forEach((protocol) => {
      protocol.deleteAllConnections();
    });
    FlowObject.nodeInstances = [];
    FlowObject.edges = [];
  }
}

export default FlowStarter;
