export default class FlowExecutorEvent {
  constructor(socket) {
    this.socket = socket;
  }

  getNodeList(listener) {
    this.socket.emit("nodeList:get", listener);
  }

  onNodeRunningStatus(listener) {
    this.socket.on("node:runningStatus", listener);
  }

  onNodeStatus(self, listener) {
    this.socket.on(self.id, (data) => listener(data));
  }

  onFlowError(listener) {
    this.socket.on("flow:error", (data) => listener(data));
  }

  onFlowNotification(listener) {
    this.socket.on("flow:notification", (data) => listener(data));
  }

  onExecuteFlow(listener) {
    this.socket.on("flow:execute", listener);
  }

  executeFlow(data) {
    this.socket.emit("flow:execute", data);
  }

  stopExecution(listener) {
    this.socket.emit("flow:stop", listener);
  }

  startByTrigger(trigId) {
    this.socket.emit("flow:startByTrigger", trigId);
  }

  onGetElements(listener) {
    this.socket.on("elements:get", (data) => listener(data));
  }

  getElements(data) {
    this.socket.emit("elements:get", data);
  }

  saveElements(data, listener) {
    this.socket.emit("elements:save", data, listener);
  }

  getGUISettings(listener) {
    this.socket.emit("gui:get", listener);
  }

  saveGUISettings(data, listener) {
    this.socket.emit("gui:save", data, listener);
  }

  onFlowExecutionStatus(listener) {
    this.socket.on("flow:executionStatus", (data) => listener(data));
  }
}
