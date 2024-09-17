import express from "express";
import { verifyAccessToken } from "../../api/middlewares/express/auth.middleware";
import ProjectController from "./project.controller";

const router = express.Router();
router.use(verifyAccessToken);

router.get("/", ProjectController.getAll);
router.get("/workspace/:workspace_id", ProjectController.getByWorkspace);
router.get("/:project_id", ProjectController.get);

router.post("/", ProjectController.create);
router.put("/:project_id", ProjectController.update);
router.delete("/:project_id", ProjectController.delete);

export default router;
