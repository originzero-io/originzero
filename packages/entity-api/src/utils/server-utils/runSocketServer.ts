import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import UserListener from "../../app/user/user.socket.listener";
import FlowListener from "../../app/flow/flow.socket.listener";
import ProjectListener from "../../app/project/project.socket.listener";
import WorkspaceListener from "../../app/workspace/workspace.socket.listener";
import NoteListener from "../../app/note/note.socket.listener";
import verifyAccessToken from "../../api/middlewares/socket/auth.middleware";
import { SocketWithPayload } from "../../types/socket";
// import socketLogger from '../../api/middlewares/socket/logger';

export default (httpServer: Server): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    try {
      const io: SocketIOServer = new SocketIOServer(httpServer);

      io.use(verifyAccessToken);
      // io.use(socketLogger);

      const onConnection = (socket: Socket) => {
        UserListener(io, <SocketWithPayload>socket);
        FlowListener(io, socket);
        ProjectListener(io, socket);
        WorkspaceListener(io, socket);
        NoteListener(io, socket);
      };

      io.on("connection", onConnection);

      console.log("Socket.io connections successful");
      resolve();
    } catch (error: any) {
      reject(error);
    }
  });
