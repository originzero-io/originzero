import cors from "cors";
import express from "express";
import logger from "morgan";
import router from "./router.js";

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use("/dockerize", router);

app.listen(PORT, () => {
  console.log(`Service started: http://localhost:${PORT}`);
});
