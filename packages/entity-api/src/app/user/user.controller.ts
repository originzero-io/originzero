import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncErrorWrapper from "express-async-handler";
import PermissionRepository from "../permission/permission.repository";
import UserRepository from "./user.repository";

class UserController {
  getAll = asyncErrorWrapper(async (req: Request, res: Response) => {
    const users = await UserRepository.getAll();
    res.status(200).send(users);
  });

  update = asyncErrorWrapper(async (req: Request, res: Response) => {
    const userId = req.params.user_id as unknown as Types.ObjectId;
    const newUser = req.body;

    const user = await UserRepository.updateBase(userId, newUser);
    res.status(200).send(user);
  });

  delete = asyncErrorWrapper(async (req: Request, res: Response) => {
    const userId = req.params.user_id as unknown as Types.ObjectId;
    console.log("user.id: ", userId);

    const user = await UserRepository.deleteBase(userId);

    console.log("userrr: ", user);
    res.status(204).send(user);
  });

  addToWorkspace = asyncErrorWrapper(async (req: Request, res: Response) => {
    const userId = req.params.user_id as unknown as Types.ObjectId;
    const workspaceId = req.body.workspace_id as unknown as Types.ObjectId;

    const user = await UserRepository.addUserToWorkspace(userId, workspaceId);
    res.status(200).send(user);
  });

  removeToWorkspace = asyncErrorWrapper(async (req: Request, res: Response) => {
    const userId = req.params.user_id as unknown as Types.ObjectId;
    const workspaceId = req.body.workspace_id as unknown as Types.ObjectId;

    const user = await UserRepository.removeUserToWorkspace(
      userId,
      workspaceId,
    );
    await PermissionRepository.deletePermission(userId, workspaceId);
    res.status(200).send(user);
  });
}

export default new UserController();
