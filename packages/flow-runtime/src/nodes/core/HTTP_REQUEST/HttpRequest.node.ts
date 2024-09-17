import axios from "axios";
import BaseNode from "../../BaseNode";

export default class HttpRequest extends BaseNode {
  async execute() {
    const url = this.getNodeConfig("url") as string;
    const { data } = await axios.get(url);
    this.returnOutput({
      response: data,
    });
  }
}
