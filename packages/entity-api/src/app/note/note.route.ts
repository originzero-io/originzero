import express from "express";
import { verifyAccessToken } from "../../api/middlewares/express/auth.middleware";
import NoteController from "./note.controller";

const router = express.Router();
router.use(verifyAccessToken);

router.get("/", NoteController.getAll);
router.get("/:note_id", NoteController.get);
router.get("/workspace/:workspace_id", NoteController.getByWorkspace);

export default router;
