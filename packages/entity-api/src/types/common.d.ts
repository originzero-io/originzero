import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface AuthPayload extends JwtPayload {
  _id: Types.ObjectId;
  username: string;
  role: string;
}
