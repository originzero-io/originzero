import { SOCKET } from "../../../api/runSocketServer";
import BaseNode from "../../BaseNode";

export default class Notification extends BaseNode {
  execute() {
    // some implementations
    SOCKET.emit(`LOG-${this.self.id}`, this.getAllParameters());
  }
}
