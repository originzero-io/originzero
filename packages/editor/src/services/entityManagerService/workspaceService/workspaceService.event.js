class WorkspaceEvent {
  constructor(socket) {
    this.socket = socket;
  }

  onCreateWorkspace(listener) {
    this.socket.on("workspaces:create", (data) => listener(data));
  }

  createWorkspace(data) {
    this.socket.emit("workspaces:create", data);
  }

  onUpdateWorkspace(listener) {
    this.socket.on("workspaces:update", (data) => listener(data));
  }

  updateWorkspace(data) {
    this.socket.emit("workspaces:update", data);
  }

  onDeleteWorkspace(listener) {
    this.socket.on("workspaces:delete", (data) => listener(data));
  }

  deleteWorkspace(data) {
    this.socket.emit("workspaces:delete", data);
  }
}

export default WorkspaceEvent;
