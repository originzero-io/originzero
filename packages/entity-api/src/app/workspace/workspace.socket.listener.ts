import { Socket, Server } from "socket.io";
import WorkspaceHandler from "./workspace.socket.handler";

const WorkspaceListener = (io: Server, socket: Socket) => {
  const { create, update, remove } = WorkspaceHandler(io, socket);

  console.log("Client ID (workspaces):".green, socket.id);
  socket.emit("workspaces:welcome", { message: "Welcome to workspaces" });
  socket.on("workspaces:create", create);
  socket.on("workspaces:update", update);
  socket.on("workspaces:delete", remove);
  socket.on("disconnect", () => {
    console.log(`${socket.id} had left from workspaces!`.red);
  });
};

export default WorkspaceListener;
