import { Server } from "socket.io";
import { User } from "../../database/models/user.model";
import { SocketWithPayload } from "../../types/socket";
import UserRepository from "./user.repository";

interface Data {
  user: User;
}

const MainHandlers = (io: Server, socket: SocketWithPayload) => {
  const onlineUser = async (data: Data) => {
    console.log("Message From Client:".blue, data);
    console.log("User online".blue, socket.user);
    const user = await UserRepository.setOnline(socket.user._id, true);
    io.emit("user:onlineUser", user);
  };
  const offlineUser = async () => {
    console.log(`${socket.id} had left from main!`.red);
    const user = await UserRepository.setOnline(socket.user._id, false);
    io.emit("user:offlineUser", user);
  };
  return { onlineUser, offlineUser };
};

export default MainHandlers;
