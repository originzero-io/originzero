import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import address from "address";
import limitAccess from "./middlewares/limitAccess.js";
import customErrorHandler from "./middlewares/customErrorHandler.js";
import router from "./routers/router.js";
import colors from "colors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (PORT) =>
  new Promise((resolve, reject) => {
    try {
      const app = express();
      app.use(logger("dev"));
      app.use(cors());
      app.use(helmet());
      app.use(express.static(path.join(__dirname, "../../public")));
      app.use(express.urlencoded({ extended: false }));
      // app.use(limitAccess({
      //   windowMs: 10 * 60 * 1000, // 10 Minutes
      //   max: 500,
      // }));
      app.use(cookieParser());
      app.use(express.json());
      app.use("/", router);

      // catch 404 and forward to error handler
      app.use((req, res, next) => {
        next(createError(404));
      });

      app.use((req, res, next) => {
        const err = new Error("Error occuried");
        err.status = 404;
        next(err);
      });
      app.use(customErrorHandler);
      app.listen(PORT, () => {
        console.log(`${process.env.SERVICE_NAME} service started.`.yellow);
        console.log("---------------------------------------------".yellow);
        console.log(`Local: http://localhost:${PORT}`.yellow);
        console.log(`On your network: http://${address.ip()}:${PORT}`.yellow);
        console.log("---------------------------------------------".yellow);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
