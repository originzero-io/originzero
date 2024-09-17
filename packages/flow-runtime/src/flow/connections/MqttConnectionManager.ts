// eslint-disable-next-line max-classes-per-file
import mqtt from "mqtt";
import MessageManager from "../MessageManager";
import IConnection from "./IConnection";
import { Node } from "../../nodes/types";
import BaseNode from "../../nodes/BaseNode";

interface MqttConnection {
  [url: string]: mqtt.MqttClient;
}

export interface MqttCredentials {
  brokerUrl: string;
  options: mqtt.IClientOptions;
}

export default class MqttConnectionManager implements IConnection {
  private mqtt = require("mqtt");

  private connections: MqttConnection = {};

  private static instance: MqttConnectionManager;

  private constructor() {}

  public static getInstance(): MqttConnectionManager {
    if (!MqttConnectionManager.instance) {
      MqttConnectionManager.instance = new MqttConnectionManager();
    }
    return MqttConnectionManager.instance;
  }

  establishConnectionByNodes(mqttNodes: Node[]) {
    if (mqttNodes.length > 0) {
      const mqttConnectionCredentials = mqttNodes.map((node) => {
        if (node.data.configParameters) {
          // return {
          //   brokerUrl: node.data.configParameters.broker_url,
          //   options: {
          //     username: node.data.configParameters.username,
          //     password: node.data.configParameters.password,
          //   },
          // };
        }
      });

      // mqttConnectionCredentials.forEach((credential) => {
      //   this.createConnection(credential?.brokerUrl, credential?.options);
      // });
    } else console.log("There is no mqtt node in this flow.");
  }

  // establishConnectionByNodes(mqttNodes: Node[]) {
  //   if (mqttNodes.length > 0) {
  //     const mqttConnectionCredentials = mqttNodes.map((node) => {
  //       if (node.data.configParameters) {
  //         return {
  //           brokerUrl: node.data.configParameters.broker_url,
  //           options: {
  //             username: node.data.configParameters.username,
  //             password: node.data.configParameters.password,
  //           },
  //         };
  //       }
  //     });

  //     mqttConnectionCredentials.forEach((credential) => {
  //       this.createConnection(credential?.brokerUrl, credential?.options);
  //     });
  //   } else console.log("There is no mqtt node in this flow.");
  // }

  createConnection(brokerUrl: string, options?: mqtt.IClientOptions) {
    if (!this.getConnection(brokerUrl)) {
      this.connections[brokerUrl] = this.mqtt.connect(brokerUrl, options);
    } else {
      // MessageManager.sendFlowError(
      //   `${brokerUrl} brokerına zaten bağlantı yapıldı`
      // );
      console.log(`${brokerUrl} brokerına zaten bağlantı yapıldı`);
    }
  }

  getConnection(brokerUrl: string) {
    return this.connections[brokerUrl];
  }

  deleteConnection(brokerUrl: string) {
    this.connections[brokerUrl].end();
    delete this.connections[brokerUrl];
  }

  deleteAllConnections() {
    Object.values(this.connections).forEach((connection) => {
      connection.end();
    });
    this.connections = {};
  }
}

// const Flow = {
//   nodes: [],
//   edges: [],
//   connections: {
//     mqtt: [
//       {
//         brokerUrl: "mqtt://localhost",
//         port: 5400,
//         username: "test_user",
//         password: "1234",
//         keepAlive: 60,
//         clientId: "",
//         useCleanSession: true,
//         connectAutomatically: true,
//       },
//       {
//         brokerUrl: "mqtt://136.132.6.14",
//         port: 5400,
//         username: "test_user",
//         password: "1234",
//         keepAlive: 60,
//         clientId: "",
//         useCleanSession: true,
//         connectAutomatically: true,
//       },
//     ],
//     modbus: [],
//     profinet: [],
//   },
// };
const Flow = {
  nodes: [],
  edges: [],
  connections: {
    mqtt: {
      "mqtt://localhost:5400": {
        port: 5400,
        username: "test_user",
        password: "1234",
        keepAlive: 60,
        clientId: "",
        useCleanSession: true,
        connectAutomatically: true,
      },
      "mqtt://localhost:5401": {
        port: 5400,
        username: "test_user",
        password: "1234",
        keepAlive: 60,
        clientId: "",
        useCleanSession: true,
        connectAutomatically: true,
      },
    },
    modbus: [],
    profinet: [],
  },
};

// Flow.connections.mqtt.map((mqttConn) => {
//   MqttConnectionManager.createConnection(mqttConn.brokerUrl);
// });

// Object.entries(Flow.connections.mqtt).map((mqttConn) => {
//   MqttConnectionManager.createConnection(mqttConn[0], mqttConn[1]);
// });
