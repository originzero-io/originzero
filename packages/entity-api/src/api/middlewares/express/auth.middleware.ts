/* eslint-disable import/prefer-default-export */
import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestWithPayload } from "../../../types/express";
import ErrorClass from "../../../utils/APIError";
import { getAccessTokenFromHeader } from "../../../utils/authHelpers";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return next(new ErrorClass("No Auth token in header", null));
  }

  const accessToken = getAccessTokenFromHeader(req);

  try {
    const payload = (await jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY || "",
    )) as RequestWithPayload["user"];

    (<RequestWithPayload>req).user = {
      _id: payload.id,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch (err) {
    return next(new ErrorClass("Error in token verify", null));
  }
};
