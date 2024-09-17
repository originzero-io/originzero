import dotenv from "dotenv";
import runDatabase from "./utils/server-utils/runDatabase";
import runHttpServer from "./utils/server-utils/runHttpServer";
import runSocketServer from "./utils/server-utils/runSocketServer";

dotenv.config({
  path: "src/config/env/config.env",
});

const PORT = Number(process.env.PORT) || 5000;

runHttpServer(PORT)
  .then(runSocketServer)
  .then(runDatabase)
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
