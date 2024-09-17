import express from "express";
import { verifyAccessToken } from "../../api/middlewares/express/auth.middleware";
import WorkspaceController from "./workspace.controller";

const router = express.Router();
router.use(verifyAccessToken);

router.get("/", WorkspaceController.getAll);
router.get("/my-workspaces", WorkspaceController.getMy);
router.get("/:workspace_id", WorkspaceController.get);
router.post("/", WorkspaceController.create);
router.put("/:workspace_id", WorkspaceController.update);
router.delete("/:workspace_id", WorkspaceController.delete);

export default router;
