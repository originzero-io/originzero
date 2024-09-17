/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { getAccessTokenFromHeader } from "../../auth-module/helpers/authHelpers.js";
import ErrorClass from "../../utils/ErrorClass.js";
export const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
  if (!token) {
    return next(new ErrorClass("No Auth token in header", 401));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return next(new ErrorClass("Error in token verify", 401));
    }
    req.user = {
      _id: payload.id,
      username: payload.username,
      role: payload.role,
    };
    next();
  });
};
