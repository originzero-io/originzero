import { Server, Socket } from "socket.io";
import FlowHandler from "./flow.socket.handler";

const FlowListener = (io: Server, socket: Socket) => {
  const { create, update, move, remove } = FlowHandler(io, socket);

  console.log("Client ID (flows):".green, socket.id);
  socket.emit("flows:welcome", { message: "Welcome to flows" });
  socket.on("flows:create", create);
  socket.on("flows:update", update);
  socket.on("flows:move", move);
  socket.on("flows:delete", remove);
  socket.on("flows:messageFromClient", (data) => {
    console.log("Message From Client:", data);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} had left from flows!`.red);
  });
};

export default FlowListener;
