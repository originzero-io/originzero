import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler";
import { Types } from "mongoose";
import ProjectRepository from "./project.repository";

class ProjectController {
  getAll = asyncErrorWrapper(async (req: Request, res: Response) => {
    const projects = await ProjectRepository.getAll();
    console.log(req.query);
    res.status(200).send(projects);
  });

  get = asyncErrorWrapper(async (req: Request, res: Response) => {
    const projectId = req.params.project_id as unknown as Types.ObjectId;
    const project = await ProjectRepository.getById(projectId);
    res.status(200).send(project);
  });

  getByWorkspace = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const projects = await ProjectRepository.getByWorkspace(workspaceId);
    res.status(200).send(projects);
  });

  create = asyncErrorWrapper(async (req: Request, res: Response) => {
    const project = await ProjectRepository.create(req.body);
    res.status(201).send(project);
  });

  update = asyncErrorWrapper(async (req: Request, res: Response) => {
    const projectId = req.params.workspace_id as unknown as Types.ObjectId;
    const newProject = req.body;
    const project = await ProjectRepository.update(projectId, newProject);
    res.status(200).send(project);
  });

  delete = asyncErrorWrapper(async (req: Request, res: Response) => {
    const projectId = req.params.workspace_id as unknown as Types.ObjectId;
    const project = await ProjectRepository.deleteBase(projectId);
    res.status(200).send(project);
  });
}

export default new ProjectController();
