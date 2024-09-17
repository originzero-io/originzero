import { Request, Response } from "express";
import APIError from "../../../utils/APIError";

const apiErrorHandler = (err: APIError, req: Request, res: Response): void => {
  let customError: APIError = err;
  console.log("ERROR HANDLER => Error Name: ", err.name);

  if (err.name === "SyntaxError") {
    customError = new APIError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new APIError(err.message, 400);
  }
  if (err.code === 11000) {
    customError = new APIError("Duplicate Key Found: Check your input", 400);
  }
  if (err.name === "CastError") {
    customError = new APIError("Please provide a valid id", 400);
  }

  console.log("Custom error handle: ", customError.message, customError.status);

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal server error",
  });
};

export default apiErrorHandler;
