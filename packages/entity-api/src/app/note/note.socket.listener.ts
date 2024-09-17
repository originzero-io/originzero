import { Socket, Server } from "socket.io";
import NoteHandler from "./note.socket.handler";

const NoteListener = (io: Server, socket: Socket) => {
  const { create, update, remove } = NoteHandler(io, socket);

  console.log("Client ID (notes):".green, socket.id);
  socket.on("notes:create", create);
  socket.on("notes:update", update);
  socket.on("notes:delete", remove);
  socket.on("disconnect", () => {
    console.log(`${socket.id} had left from notes!`.red);
  });
};

export default NoteListener;
