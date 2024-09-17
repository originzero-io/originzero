import dotenv from "dotenv";
import runHttpServer from "./api/runHttpServer";
import runSocketServer from "./api/runSocketServer";
import connectToDatabase from "./database/connectToDatabase";
import getNodeList from "./nodes/helpers/getNodeList";
import { NodeSkeleton } from "./nodes/types";

dotenv.config({
  path: "src/config/env/config.env",
});

const PORT = Number(process.env.PORT) || 5000;

export let NodeList: NodeSkeleton = {};

runHttpServer(PORT)
  .then(runSocketServer)
  .then(connectToDatabase)
  .then(() => {
    NodeList = getNodeList();
  })
  .catch(console.log);
