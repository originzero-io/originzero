import { Node } from "../nodes/types";
import { IO, SOCKET } from "../api/runSocketServer";

class MessageManager {
  static sendRunningStatus(nodeId: Node["id"]) {
    SOCKET.emit("node:runningStatus", nodeId);
  }

  static sendNodeStatus(
    nodeId: Node["id"],
    info: { message: string; color: string }
  ) {
    SOCKET.emit(nodeId, info);
  }

  static sendFlowError(errorMsg: string) {
    SOCKET.emit("flow:error", errorMsg);
  }

  static sendFlowNotification(notificationMsg: string) {
    SOCKET.emit("flow:notification", notificationMsg);
  }
}

export default MessageManager;
