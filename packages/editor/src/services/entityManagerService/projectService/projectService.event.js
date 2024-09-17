class ProjectEvent {
  constructor(socket) {
    this.socket = socket;
  }

  onCreateProject(listener) {
    this.socket.on("projects:create", (data) => listener(data));
  }

  createProject(data) {
    this.socket.emit("projects:create", data);
  }

  onUpdateProject(listener) {
    this.socket.on("projects:update", (data) => listener(data));
  }

  updateProject(data) {
    this.socket.emit("projects:update", data);
  }

  onDeleteProject(listener) {
    this.socket.on("projects:delete", (data) => listener(data));
  }

  deleteProject(data) {
    this.socket.emit("projects:delete", data);
  }
}

export default ProjectEvent;
