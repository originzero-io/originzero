import { Request, Response, NextFunction } from "express";
import asyncErrorWrapper from "express-async-handler";
import APIError from "../../../utils/APIError";
import Project from "../../../database/models/project.model";
import Flow from "../../../database/models/flow.model";
import Workspace from "../../../database/models/workspace.model";

export const checkProjectExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await Project.findById(req.params.project_id);
    if (!project) {
      return next(new APIError("This project does not exist", 404));
    }
    next();
  },
);

export const checkFlowExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const flow = await Flow.findById(req.params.flow_id);
    if (!flow) {
      return next(new APIError("This flow does not exist", 404));
    }
    next();
  },
);

export const checkWorkspaceExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const workspace = await Workspace.findById(req.params.workspace_id);
    if (!workspace) {
      return next(new APIError("This workspace does not exist", 404));
    }
    next();
  },
);
