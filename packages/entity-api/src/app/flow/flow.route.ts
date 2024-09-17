import express from "express";
import FlowController from "./flow.controller";

const router = express.Router();

router.get("/", FlowController.getAll);
router.get("/:flow_id", FlowController.get);
router.get("/project/:project_id", FlowController.getByProject);
router.get("/workspace/:workspace_id", FlowController.getByWorkspace);

router.post("/", FlowController.create);
router.delete("/:flow_id", FlowController.delete);

export default router;
