import express from "express";
import controllers from "./controllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("flow-dockerize-service is alive!");
});

router.get("/free-port", controllers.getFreePort);

router.post("/flow/:id", controllers.createContainer);

router.delete("/flow/:id", controllers.deleteContainer);

export default router;
