import BaseNode from "../../BaseNode";
import { Node } from "../../types";

export default class PID extends BaseNode {
  constructor(self: Node) {
    super(self);
    this.registerEvent("stop", this.stopEvent);
  }

  stopEvent() {
    console.log("PID STOP EVENT RUN !!!");
    const parameters = this.getAllNodeConfig();
    const stopParameters = {
      ...parameters,
      on_off: "off",
    };
    this.returnOutput({
      pid: { ...stopParameters },
    });
  }

  async execute() {
    // some implementations

    const setPoint = this.getParameter("SetPoint");
    // console.log("SetPoint: ", setPoint);
    const parameters = this.getAllNodeConfig();
    // console.log("parameters: ", parameters);
    // console.log("OUTPUT: ", { setPoint, ...parameters });
    this.sendStatus({ message: "çalıştı", color: "success" });
    this.returnOutput({
      pid: { setPoint, ...parameters },
    });
  }
}
