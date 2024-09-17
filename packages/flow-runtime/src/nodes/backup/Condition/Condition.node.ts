import BaseNode from "../../BaseNode";

export default class Constant extends BaseNode {
  execute() {
    this.returnOutput({
      value: this.getNodeConfig("message"),
    });
  }
}
