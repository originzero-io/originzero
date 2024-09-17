/* eslint-disable no-restricted-syntax */
import MessageManager from "../flow/MessageManager";
import { ensureError } from "../utils/common/error-utils";
import EdgeManager from "./EdgeManager";
import OutgoerManager from "./OutgoerManager";
import { ConfigurationData, InputData, Node, Edge, OutputData } from "./types";

enum RequestType {
  TRIG = "trig",
  STATUS = "status",
}
type CustomEventFunc = () => void | Promise<void>;
type CustomEvent = {
  name: string;
  func: CustomEventFunc;
};

abstract class BaseNode {
  private triggedBy: Node | undefined;

  private triggedHandle: Edge["sourceHandle"] | undefined;

  private edgeManager: EdgeManager;

  private outgoerManager: OutgoerManager;

  private params: InputData;

  private readonly configParameters: any;
  // ! configParameters yapısındaki değişiklikler uygulanınca type değiştirilecek
  // private readonly configParameters: ConfigurationData;

  private readonly triggerAttributes: Node["data"]["triggerAttributes"];

  private customEvents: CustomEvent[] = [];

  private isEnable: boolean;

  private isRunning: boolean;

  constructor(public readonly self: Node) {
    console.log("*********************************");
    console.log(this.self.id, "CONSTRUCTOR", "\n");

    this.registerEvent("enable", this.enableNode);
    this.registerEvent("disable", this.disableNode);

    this.configParameters = self.data.configParameters || {};
    this.triggerAttributes = self.data.triggerAttributes;
    this.isEnable = self.data.enable ? self.data.enable : false;
    this.isRunning = false;
  }

  protected getParameter(name: string) {
    return this.params[name];
  }

  protected getAllParameters() {
    return this.params;
  }

  protected getNodeConfig(name: string) {
    return this.configParameters[name];
  }

  protected getAllNodeConfig() {
    return this.configParameters;
  }

  public sendStatus(info: { message: string; color: string }) {
    MessageManager.sendNodeStatus(this.self.id, info);
  }

  public sendFlowNotification(message: string) {
    MessageManager.sendFlowNotification(message);
  }

  abstract execute(): void | Promise<void>;

  protected registerEvent(eventName: string, customEventFunc: CustomEventFunc) {
    this.customEvents.push({
      name: eventName,
      func: customEventFunc.bind(this),
    });
  }

  public startNodeManagers() {
    // this.edgeManager = new EdgeManager(this);
    // this.outgoerManager = new OutgoerManager(this);
    this.edgeManager = new EdgeManager(this.self);
    this.outgoerManager = new OutgoerManager(this.self, this.edgeManager);
  }

  public async startNode(
    triggedBy?: Node,
    triggedHandle?: Edge["sourceHandle"]
  ) {
    console.log("\n");
    this.triggedBy = triggedBy;
    this.triggedHandle = triggedHandle;
    this.params = this.edgeManager.getInputDatasFromEdges();

    console.log("TRIGGED BY => ", this.triggedBy?.id);
    console.log("TRIGGED-HANDLE ", this.self.id, "=> ", this.triggedHandle);

    if (this.triggedHandle) {
      // all nodes except input nodes
      await this.handleRunBasedRequestType(this.triggedHandle);
    } else {
      // input nodes does not have triggedHandle
      await this.run();
    }
  }

  private async handleRunBasedRequestType(triggedHandle: string) {
    const [requestType, requestEvent] = triggedHandle.split("_");

    switch (requestType) {
      case RequestType.TRIG:
        await this.handleRunBasedTrigRequest();
        break;
      case RequestType.STATUS:
        await this.handleRunBasedStatusRequest(requestEvent);
        break;
      default:
        // value trig
        await this.run();
    }
  }

  private async handleRunBasedStatusRequest(trigEvent: string) {
    const customEvent = this.customEvents.find(
      (event) => event.name === trigEvent
    );
    if (customEvent) {
      await customEvent.func();
      // ?
      this.returnOutput({});
    } else console.log("there is no defined status event like that");
  }

  private async handleRunBasedTrigRequest(): Promise<void> {
    console.log("TRIG FUNCTION - ", this.self.id);
    const { trigHandles } = this.self.data;
    if (trigHandles) {
      const myTrigEdges = this.edgeManager.getMyTrigEdges();

      const targetHandleSet = new Set<string>();

      // farklı triglere bağlanmış inputları ayrıştırılmış şekilde tutmak için bir dizi
      const distinctEdges: (typeof myTrigEdges)[] = [];

      for (const edge of myTrigEdges) {
        if (!targetHandleSet.has(edge.targetHandle)) {
          // Eğer targetHandle değeri daha önce eklenmediyse, kenarı diziye ekle
          targetHandleSet.add(edge.targetHandle);
          distinctEdges.push([edge]);
        } else {
          // Eğer targetHandle değeri daha önce eklenmişse, ilgili diziyi bulup kenarı ekle
          const index = distinctEdges.findIndex(
            (arr) => arr[0].targetHandle === edge.targetHandle
          );
          distinctEdges[index].push(edge);
        }
      }

      // triglenmiş uçları bul (null olmayan)
      // örnek => [true, false]
      const hasNonNullValues = distinctEdges.map((edges) =>
        edges.some((edge) => edge.data !== null)
      );

      // çalışmak için gerekli tüm triglerin tetiklenmiş olduğundan emin ol
      const areAllTrigsTrigged = hasNonNullValues.every(
        (value) => value === true
      );
      if (areAllTrigsTrigged) {
        await this.run();
      } else {
        console.log("All handles must have value in it.", this.self.id);
      }
    }
  }

  private enableNode(): void {
    this.isEnable = true;
  }

  private disableNode(): void {
    console.log("DISABLE ÇALIŞTI: ", this.self.id);
    this.isEnable = false;
  }

  private doesInputParamsContainsNull(): boolean {
    if (this.self.data.inputParameters) {
      const inputValues = Object.values(this.params);
      console.log("INPUT VALUES: ", inputValues, this.self.id);
      const isThereNullValue = inputValues.some((value) => value === null);
      return isThereNullValue;
    }
    return false;
  }

  private async run(): Promise<void | string> {
    if (this.isRunning) {
      this.handleRunningNode();
    } else if (!this.isRunning) {
      if (this.isEnable) {
        if (!this.doesInputParamsContainsNull()) {
          this.isRunning = true;

          MessageManager.sendRunningStatus(this.self.id);

          console.log("RUNNING => ", this.self.id);
          console.log("INPUT PARAMS: ", this.params);
          this.outgoerManager.trigStartOutgoers();
          try {
            await this.execute();
            this.isRunning = false;
          } catch (error) {
            this.isRunning = false;
            const err = ensureError(error);
            console.log("ERROR IN THIS NODE", this.self.id, "=> ", err.message);
            this.sendStatus({ message: err.message, color: "danger" });
            this.outgoerManager.trigErrorOutgoers();
            this.outgoerManager.trigErrorValueOutgoers(err.message);
          }
        } else {
          console.log("One of the inputs is null", this.self.id);
        }
      } else {
        console.log("Node cannot run because it is not enable", this.self.id);
      }
    } else console.log("Invalid isRunning property!");
  }

  private handleRunningNode(): void {
    console.log("NODE ÇALIŞIRKEN YENİDEN TETİKLENDİ");
    switch (this.triggerAttributes) {
      case "Ignore":
        break;
      case "Restart operation":
        // cancel this operation
        this.isRunning = false;
        this.startNode(this.triggedBy, this.triggedHandle);
        break;
      case "Queue":
        break;
      default:
        break;
    }
  }

  protected returnOutput(data: OutputData) {
    // write data to relevant handle of edge
    const myOutputValues = this.self.data.outputValues;
    this.edgeManager.removeInputValuesFromEdges();
    this.isRunning = false;
    if (myOutputValues) {
      const myOutputLength = Object.keys(myOutputValues as object).length;
      const dataLength = Object.keys(data).length;

      if (dataLength !== myOutputLength) {
        console.log("Return value count must be equal to output values count.");
        console.log("Your returned data: ");
        console.table(data);
        console.log("Should be: ");
        console.table(myOutputValues);
      } else {
        console.log("setOutputValuesToEdges: ", data);
        this.edgeManager.setOutputValuesToEdges(data);

        if (this.self.type !== "CONSTANT") {
          this.outgoerManager.trigValueOutgoers();
          this.outgoerManager.trigEndOutgoers();
        }
      }
    } else this.outgoerManager.trigEndOutgoers();
  }
}

export default BaseNode;
