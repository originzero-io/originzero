/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import ErrorClass from "../../../utils/APIError";
import { SocketNextFunction, SocketWithPayload } from "../../../types/socket";

const verifyAccessToken = async (socket: Socket, next: SocketNextFunction) => {
  const { token } = socket.handshake.auth;
  if (token) {
    try {
      const payload = (await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "",
      )) as SocketWithPayload["user"];

      (<SocketWithPayload>socket).user = {
        _id: payload.id,
        username: payload.username,
        role: payload.role,
      };

      console.log("socket-user:", (<SocketWithPayload>socket).user);
      next();
    } catch (err) {
      return next(new ErrorClass("Error in token verify", null));
    }
  } else {
    return next(new ErrorClass("No Auth token in header", 403));
  }
};

export default verifyAccessToken;
