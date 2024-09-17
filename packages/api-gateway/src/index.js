/* eslint-disable no-undef */
import dotenv from "dotenv";
import runDatabase from "./api/runDatabase.js";
import runGateway from "./api/runGateway.js";

dotenv.config({
  path: "src/config/env/config.env",
});

const PORT = process.env.PORT || 5000;

runGateway(PORT)
  .then(runDatabase)
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
