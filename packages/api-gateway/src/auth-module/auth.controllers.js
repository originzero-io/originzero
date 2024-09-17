/* eslint-disable no-undef */
import asyncErrorWrapper from "express-async-handler";
import { sendJwtToClient } from "./helpers/authHelpers.js";
import AuthRepository from "./auth.repository.js";

export const login = asyncErrorWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const userWithoutPassword = await AuthRepository.login({
    username,
    password,
  });
  return sendJwtToClient(userWithoutPassword, res);
});
export const logout = asyncErrorWrapper(async (req, res) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()), // token ı hemen expire et
      secure: NODE_ENV !== "development",
    })
    .json({
      message: "Logout successfull",
    });
});

export const register = asyncErrorWrapper(async (req, res) => {
  const avatar = req.file?.filename;
  const person = { ...req.body, avatar };
  const user = await AuthRepository.register(person);
  res.status(201).send(user);
});
export const me = asyncErrorWrapper(async (req, res) => {
  const { _id } = req.user;
  const user = await AuthRepository.me(_id);
  res.status(201).send(user);
});
