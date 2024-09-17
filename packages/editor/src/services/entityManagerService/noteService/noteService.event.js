class NoteEvent {
  constructor(socket) {
    this.socket = socket;
  }

  onCreateNote(listener) {
    this.socket.on("notes:create", (data) => listener(data));
  }

  createNote(data) {
    this.socket.emit("notes:create", data);
  }

  onUpdateNote(listener) {
    this.socket.on("notes:update", (data) => listener(data));
  }

  updateNote(data) {
    this.socket.emit("notes:update", data);
  }

  onDeleteNote(listener) {
    this.socket.on("notes:delete", (data) => listener(data));
  }

  deleteNote(data) {
    this.socket.emit("notes:delete", data);
  }
}

export default NoteEvent;
