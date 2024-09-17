import http from "http";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import os from "os";
import logger from "morgan";
import cookieParser from "cookie-parser";
import ElementRepository from "../database/repository/ElementRepository";
import getNodeList from "../nodes/helpers/getNodeList";
import { NodeList } from "..";

export default (PORT: number): Promise<http.Server> =>
  new Promise((resolve, reject) => {
    try {
      const app: Application = express();
      const server: http.Server = http.createServer(app);

      app.use(cors());
      app.use(logger("dev"));
      app.use(cookieParser());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.get("/test/elements", async (req: Request, res: Response) => {
        const elements = await ElementRepository.get();
        res.status(200).send(elements);
      });

      app.get("/getNodeList", async (req: Request, res: Response) => {
        const nodeList = NodeList;
        res.status(200).send(nodeList);
      });

      app.get("/", (req: Request, res: Response) => {
        const port = process.env.PORT;
        console.log("Hi! This is me! My port is: ", port);
        res.send(`hello i am flow-executor-service. my port is: ${port} `);
      });

      server.listen(PORT, () => {
        console.log("Server is running: ", PORT);
        resolve(server);
      });
    } catch (error) {
      reject(error);
    }
  });
