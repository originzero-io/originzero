import BaseNode from "../../BaseNode";

export default class MotorSpeed extends BaseNode {
  async execute() {
    // some implementations
    const parameters = this.getAllNodeConfig();

    this.returnOutput({
      speed: { ...parameters },
    });
  }
}
