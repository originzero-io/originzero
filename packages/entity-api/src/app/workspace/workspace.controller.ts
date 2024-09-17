import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncErrorWrapper from "express-async-handler";
import WorkspaceRepository from "./workspace.repository";
import { RequestWithPayload } from "../../types/express";

class WorkspaceController {
  getAll = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaces = await WorkspaceRepository.getAll();
    res.send(workspaces);
  });

  getMy = asyncErrorWrapper(async (req: Request, res: Response) => {
    const { user } = req as RequestWithPayload;
    const myWorkspaces = await WorkspaceRepository.getMyWorkspaces(user);
    res.send(myWorkspaces);
  });

  get = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const workspace = await WorkspaceRepository.getById(workspaceId);
    res.status(200).send(workspace);
  });

  create = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspace = await WorkspaceRepository.createBase(req.body);
    res.status(201).send(workspace);
  });

  update = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const newWorkspace = req.body;

    const workspace = await WorkspaceRepository.updateBase(
      workspaceId as unknown as Types.ObjectId,
      newWorkspace,
    );

    res.status(200).send(workspace);
  });

  delete = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const workspace = await WorkspaceRepository.deleteBase(workspaceId);
    res.status(200).send(workspace);
  });
}

export default new WorkspaceController();
