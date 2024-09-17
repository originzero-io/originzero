import { Socket, Server } from "socket.io";
import UserHandler from "./user.socket.handler";
import { SocketWithPayload } from "../../types/socket";

const UserListener = (io: Server, socket: SocketWithPayload) => {
  const { onlineUser, offlineUser } = UserHandler(io, socket);

  console.log("*********************************************".yellow);
  console.log("Client ID (main):".green, socket.id);
  socket.emit("user:welcome", { message: "Welcome to main" });
  socket.on("user:onlineUser", onlineUser);
  socket.on("disconnect", offlineUser);
  socket.on("postman-test", (data: any) => {
    socket.nsp.emit("postman-test", { message: "this is me" });
  });
};
export default UserListener;
