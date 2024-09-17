import express from "express";
import PermissionController from "./permission.controller";
import { verifyAccessToken } from "../../api/middlewares/express/auth.middleware";

const router = express.Router();

router.use(verifyAccessToken);

router.get("/", PermissionController.getAllPermissions);
router.get(
  "/workspace/:workspace_id/user/:user_id",
  PermissionController.getUserPermissionInThisWorkspace,
);
router.post("/", PermissionController.savePermission);

router.get("/presets", PermissionController.getAllPresets);
router.get("/presets/:preset_id", PermissionController.getPreset);
router.post("/presets", PermissionController.createPreset);

export default router;
