import FlowObject from "../flow/core/FlowObject";
import { fillObjectWithNull } from "../utils/common/array-utils";
import BaseNode from "./BaseNode";
import { getHandleName, getIncomers } from "./helpers/node-helpers";
import { Edge, Node, OutputData, StatusOutput } from "./types";

class EdgeManager {
  private incomers: BaseNode[];

  constructor(private self: Node) {
    const { edges, nodeInstances } = FlowObject;
    this.incomers = getIncomers(this.self, nodeInstances, edges);
  }

  public getMyTrigEdges(): Edge[] {
    const { edges } = FlowObject;
    return edges.filter(
      (edge) =>
        edge.target === this.self.id && edge.targetHandle.includes("trig_")
    );
  }

  public getMyInputValueEdges(): Edge[] {
    const { edges } = FlowObject;
    return edges.filter(
      (edge) =>
        edge.target === this.self.id &&
        !edge.targetHandle.includes("trig_") &&
        !edge.targetHandle.includes("status_")
    );
  }

  public getMyOutputValueEdges(): Edge[] {
    const { edges } = FlowObject;
    return edges.filter(
      (edge) =>
        edge.source === this.self.id &&
        !edge.sourceHandle.includes("trig_") &&
        !edge.sourceHandle.includes("status_") &&
        !edge.sourceHandle.includes("errorVal")
    );
  }

  public getMyOutputStatusEdges(statusName: StatusOutput): Edge[] {
    const { edges } = FlowObject;
    return edges.filter(
      (edge) =>
        edge.source === this.self.id &&
        edge.sourceHandle === `status_${statusName}`
    );
  }

  public getMyErrorValueEdges(): Edge[] {
    const { edges } = FlowObject;
    return edges.filter(
      (edge) =>
        edge.source === this.self.id && edge.sourceHandle === "string_errorVal"
    );
  }

  public getInputDatasFromEdges() {
    const { inputParameters } = this.self.data;
    if (inputParameters) {
      const inputDatas: any = { ...inputParameters };
      const inputValueEdges = this.getMyInputValueEdges();
      if (inputValueEdges.length > 0) {
        inputValueEdges.forEach((inputValueEdge) => {
          const inputName = getHandleName(inputValueEdge.targetHandle);
          inputDatas[inputName] = inputValueEdge.data;
        });
        return inputDatas;
      }
      return fillObjectWithNull(inputParameters);
    }
    return null;
  }

  public setOutputValuesToEdges(outputData: OutputData): void {
    const { edges } = FlowObject;
    // edge bana aitse, verilen isimdeki handleın datasını yeni datayla değiştir
    edges.forEach((edge) => {
      const outputDataEntries = Object.entries(outputData);

      // [['result','joel'], ['result2', 'ellie']]
      const handle = outputDataEntries.find(
        (outputDataEntry) =>
          edge.source === this.self.id &&
          outputDataEntry[0] === getHandleName(edge.sourceHandle)
      );

      if (handle) {
        const handleData = handle[1];
        edge.data = handleData;
      }
    });

    // console.log("setEdges: ", edges.length, edges);
  }

  public removeInputValuesFromEdges() {
    // bu noda bağlı olan ve frozen olmayan bütün edgelerin datalarını temizle
    const { edges } = FlowObject;

    if (this.incomers.length > 0) {
      const myIncomersFrozenHandles = this.incomers.map((incomer) => ({
        id: incomer.self.id,
        frozen: incomer.self.data.frozenHandles,
      }));

      edges.forEach((edge) => {
        if (edge.target === this.self.id && !edge.source.includes("CONSTANT")) {
          const handleName = getHandleName(edge.sourceHandle);

          /* aynı frozen handle ismine sahip birden fazla incomers olabileceği için,
          hangi incomerın edge datasını sileceğimizi tespit ettik */
          const isFrozen = myIncomersFrozenHandles.some(
            (item) =>
              item.id === edge.source && item.frozen?.includes(handleName)
          );

          if (!isFrozen) {
            edge.data = null;
          }
        }
      });
    }
  }
}

export default EdgeManager;
