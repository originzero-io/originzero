import axios from "axios";
import BaseNode from "../../BaseNode";

export default class Calculate extends BaseNode {
  async execute() {
    const formula = this.getNodeConfig("formula");
    const decimalPoint = this.getNodeConfig("decimal_point");

    const allParameters = this.getAllParameters();

    const response = await axios.post("http://127.0.0.1:8006/calculate", {
      latex_code: formula,
      variables: {
        ...allParameters,
      },
      options: {
        decimal_point: decimalPoint,
      },
    });

    this.sendStatus({ message: response.data.result, color: "success" });

    this.returnOutput({
      result: response.data.result,
    });
  }
}
