import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncErrorWrapper from "express-async-handler";
import FlowRepository from "./flow.repository";

class FlowController {
  getAll = asyncErrorWrapper(async (req: Request, res: Response) => {
    const flows = await FlowRepository.getAll();
    res.status(200).send(flows);
  });

  get = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const flow = await FlowRepository.get(workspaceId);
    res.status(200).send(flow);
  });

  getByWorkspace = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const flows = await FlowRepository.getByWorkspace(workspaceId);
    res.status(200).send(flows);
  });

  getByProject = asyncErrorWrapper(async (req: Request, res: Response) => {
    const projectId = req.params.project_id as unknown as Types.ObjectId;
    const flows = await FlowRepository.getByProject(projectId);
    res.status(200).send(flows);
  });

  create = asyncErrorWrapper(async (req: Request, res: Response) => {
    const flow = await FlowRepository.create(req.body);
    res.status(201).send(flow);
  });

  delete = asyncErrorWrapper(async (req: Request, res: Response) => {
    const flowId = req.params.flow_id as unknown as Types.ObjectId;
    const flow = await FlowRepository.deleteBase(flowId);
    res.status(200).send(flow);
  });
}

export default new FlowController();
