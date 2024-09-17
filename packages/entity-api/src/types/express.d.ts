import { Request } from "express";
import { AuthPayload } from "./common";

export interface RequestWithPayload extends Request {
  user: AuthPayload;
}
