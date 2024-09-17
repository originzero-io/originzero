import express from "express";
import UserController from "./user.controller";

const router = express.Router();

// router.use(verifyAccessToken);

router.get('/', UserController.getAll);
router.post('/:user_id/workspace', UserController.addToWorkspace);
router.delete('/:user_id/workspace', UserController.removeToWorkspace);
router.put('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete);

export default router;
