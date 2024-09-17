import cookieParser from "cookie-parser";
import createError from "http-errors";
import http from "http";
import express, { Handler } from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import address from "address";
import colors from "colors";
import routes from "../../api/route";
import apiErrorHandler from "../../api/middlewares/express/error.middleware";
import { accessLogStream } from "../logHelpers";

colors.green("This is entity-manager-service!");

export default (PORT: number): Promise<http.Server> =>
  new Promise((resolve, reject) => {
    try {
      const app = express();
      const server = http.createServer(app);
      // Setup the logger
      app.use(
        logger("combined", {
          stream: accessLogStream,
          skip(req, res) {
            return res.statusCode < 400;
          },
        }),
      );

      app.use(express.static(path.join(__dirname, "../../../dist")));
      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../../../dist", "index.html"));
      });

      app.use(logger("dev"));
      app.use(cors());
      app.use(cookieParser());
      app.use(express.json());
      app.use(express.static(path.join(__dirname, "public")) as Handler);
      app.use(express.urlencoded({ extended: false }));
      app.use("/entity-manager", routes);

      // error handler
      app.use(apiErrorHandler);

      // catch 404 and forward to error handler
      app.use((req, res, next) => {
        next(createError(404));
      });

      if (process.env.NODE_ENV !== "test") {
        server.listen(PORT, () => {
          console.log(`${process.env.SERVICE_NAME} service started.`.yellow);
          console.log("---------------------------------------------".yellow);
          console.log(`Local: http://localhost:${PORT}`.yellow);
          console.log(`On your network: http://${address.ip()}:${PORT}`.yellow);
          console.log("---------------------------------------------".yellow);
          resolve(server);
        });
      }
    } catch (error: any) {
      reject(error);
    }
  });
