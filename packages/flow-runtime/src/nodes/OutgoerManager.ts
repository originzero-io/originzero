/* eslint-disable class-methods-use-this */
import FlowObject from "../flow/core/FlowObject";
import NodeRunner from "../flow/core/NodeRunner";
import MessageManager from "../flow/MessageManager";
import { RFEdge } from "../types/react-flow";
import BaseNode from "./BaseNode";
import EdgeManager from "./EdgeManager";
import { Node, StatusOutput } from "./types";

class OutgoerManager {
  private readonly outgoers: BaseNode[];

  private readonly valueOutgoers: BaseNode[];

  private readonly startOutgoers: BaseNode[];

  private readonly endOutgoers: BaseNode[];

  private readonly errorOutgoers: BaseNode[];

  private readonly errorValueOutgoers: BaseNode[];

  constructor(private self: Node, private edgeManager: EdgeManager) {
    const { edges, nodeInstances } = FlowObject;
    this.outgoers = this.getOutgoers(this.self, nodeInstances, edges);

    this.valueOutgoers = this.getMyValueOutgoers();
    this.startOutgoers = this.getMyStatusOutgoers("start");
    this.endOutgoers = this.getMyStatusOutgoers("end");
    this.errorOutgoers = this.getMyStatusOutgoers("error");
    this.errorValueOutgoers = this.getMyErrorValueOutgoers();
  }

  private getOutgoers = (
    node: Node,
    nodeInstances: BaseNode[],
    edges: RFEdge[]
  ): BaseNode[] => {
    const outgoerIds = edges
      .filter((e) => e.source === node.id)
      .map((e) => e.target);
    const outgoers = nodeInstances.filter((n) =>
      outgoerIds.includes(n.self.id)
    );
    return outgoers;
  };

  public getMyValueOutgoers(): BaseNode[] {
    const outputValueEdges = this.edgeManager.getMyOutputValueEdges();
    return this.outgoers.filter((outgoer) =>
      outputValueEdges.find((valueEdge) => valueEdge.target === outgoer.self.id)
    );
  }

  public getMyErrorValueOutgoers(): BaseNode[] {
    const myErrorValEdges = this.edgeManager.getMyErrorValueEdges();
    return this.outgoers.filter((outgoer) =>
      myErrorValEdges.find(
        (errorValEdge) => errorValEdge.target === outgoer.self.id
      )
    );
  }

  public getMyStatusOutgoers(statusName: StatusOutput): BaseNode[] {
    const myRelevantStatusEdges =
      this.edgeManager.getMyOutputStatusEdges(statusName);
    return this.outgoers.filter((outgoer) =>
      myRelevantStatusEdges.find(
        (relevantStatusEdge) => relevantStatusEdge.target === outgoer.self.id
      )
    );
  }

  public async trigValueOutgoers() {
    const outputValueEdges = this.edgeManager.getMyOutputValueEdges();
    const outputHandles = outputValueEdges.map((o) => o.target);
    console.log("TRIG VALUE RUNNING =>", this.self.id, outputHandles);
    // console.log("output edges: ", this.self.id, outputValueEdges);
    await NodeRunner.runOutgoersConcurrently(
      this.valueOutgoers,
      this.self,
      outputValueEdges
    );
  }

  public async trigStartOutgoers() {
    if (this.self.data.statusHandles?.outputs?.start) {
      const startOutputs = this.edgeManager.getMyOutputStatusEdges("start");
      // console.log("startOutputs: ", startOutputs);
      const outputs = startOutputs.map((o) => o.target);

      console.log("TRIG START RUNNING =>", this.self.id, outputs);
      this.edgeManager.setOutputValuesToEdges({
        start: "started",
      });

      await NodeRunner.runOutgoersConcurrently(
        this.startOutgoers,
        this.self,
        startOutputs
      );
    }
  }

  public async trigEndOutgoers() {
    if (this.self.data.statusHandles?.outputs?.end) {
      const endOutputs = this.edgeManager.getMyOutputStatusEdges("end");
      const outputs = endOutputs.map((o) => o.target);

      console.log("TRIG END RUNNING =>", this.self.id, outputs);
      this.edgeManager.setOutputValuesToEdges({
        end: "ended",
      });

      await NodeRunner.runOutgoersConcurrently(
        this.endOutgoers,
        this.self,
        endOutputs
      );
    }
  }

  public async trigErrorOutgoers() {
    if (this.self.data.statusHandles?.outputs?.error) {
      const errorOutputs = this.edgeManager.getMyOutputStatusEdges("error");
      const outputs = errorOutputs.map((o) => o.target);

      console.log("TRIG ERROR RUNNING =>", this.self.id, outputs);
      this.edgeManager.setOutputValuesToEdges({
        error: "error",
      });

      await NodeRunner.runOutgoersConcurrently(
        this.errorOutgoers,
        this.self,
        errorOutputs
      );
    }
  }

  public async trigErrorValueOutgoers(errorMessage: string) {
    if (this.self.data.statusHandles?.outputs?.errorVal) {
      const errorValOutputs = this.edgeManager.getMyErrorValueEdges();
      const outputs = errorValOutputs.map((o) => o.target);
      console.log("TRIG ERROR-VAL RUNNING =>", this.self.id, outputs);

      MessageManager.sendNodeStatus(this.self.id, {
        message: errorMessage,
        color: "danger",
      });

      this.edgeManager.setOutputValuesToEdges({
        errorVal: errorMessage,
      });

      await NodeRunner.runOutgoersConcurrently(
        this.errorValueOutgoers,
        this.self,
        errorValOutputs
      );
    }
  }
}

export default OutgoerManager;
