class FlowEvent {
  constructor(socket) {
    this.socket = socket;
  }

  onCreateFlow(listener) {
    this.socket.on("flows:create", (data) => listener(data));
  }

  createFlow(data) {
    this.socket.emit("flows:create", data);
  }

  onUpdateFlow(listener) {
    this.socket.on("flows:update", (data) => listener(data));
  }

  updateFlow(data) {
    this.socket.emit("flows:update", data);
  }

  onDeleteFlow(listener) {
    this.socket.on("flows:delete", (data) => listener(data));
  }

  deleteFlow(data) {
    this.socket.emit("flows:delete", data);
  }

  onMoveFlow(listener) {
    this.socket.on("flows:move", (data) => listener(data));
  }

  moveFlow(data) {
    this.socket.emit("flows:move", data);
  }
}

export default FlowEvent;
