import { Socket } from "socket.io";
import APIError from "../utils/APIError";
import { AuthPayload } from "./common";

export interface SocketWithPayload extends Socket {
  user: AuthPayload;
}
export interface SocketNextFunction {
  (param1?: APIError): void;
}
