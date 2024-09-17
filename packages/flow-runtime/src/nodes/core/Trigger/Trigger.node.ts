/* eslint-disable max-classes-per-file */
import IntervalUtil from "../../../utils/common/IntervalUtil";
import BaseNode from "../../BaseNode";
import { Node } from "../../types";

export default class Trigger extends BaseNode {
  constructor(self: Node) {
    super(self);
    this.registerEvent("clear", this.clearEvent);
  }

  clearEvent() {
    console.log("RUN CLEAR EVENT");
  }

  execute() {
    // some implementations
    const nodeInterval =
      Number(this.getNodeConfig("repeat: every x seconds")) * 1000;
    console.log("NODE_INTERVAL", nodeInterval);
    this.returnOutput({
      value: this.getNodeConfig("message"),
    });
    // IntervalUtil.createInterval(() => {
    // }, nodeInterval);
  }
}
