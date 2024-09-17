/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import APIError from "./APIError";

interface User {
  generateJwtFromUser: () => string;
}

export const sendJwtToClient = (user: User, res: Response): Response => {
  const token = user.generateJwtFromUser();
  const { JWT_COOKIE, NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE!, 10) * 1000), // ms to sn
      secure: NODE_ENV !== "development",
    })
    .json({
      access_token: token,
      data: user,
    });
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(password, hashedPassword);

export const getAccessTokenFromHeader = (req: Request): string => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new APIError("No token in header", 403);
  }
  const accessToken = authorization.split(" ")[1];
  return accessToken;
};
