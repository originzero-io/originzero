/* eslint-disable no-undef */
import express from "express";
import { login, logout, register, me } from "./auth.controllers.js";
import { verifyAccessToken } from "../api/middlewares/jwt.js";
import upload from "../api/middlewares/fileUpload.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("users resources");
});
router.post("/login", login);

router.post("/register", [upload.single("avatar")], register);
router.get("/logout", verifyAccessToken, logout);
router.get("/me", verifyAccessToken, me);

export default router;
