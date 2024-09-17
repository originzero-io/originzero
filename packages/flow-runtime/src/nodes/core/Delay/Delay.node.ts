import BaseNode from "../../BaseNode";

export default class Delay extends BaseNode {
  async execute() {
    const timeout = Number(this.getNodeConfig("timeout")) * 1000;
    setTimeout(() => {
      this.returnOutput({
        done: "",
      });
    }, timeout);
  }
}
