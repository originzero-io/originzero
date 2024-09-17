import asyncErrorWrapper from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import APIError from "../../../utils/APIError";
import User from "../../../database/models/user.model";
import Workspace from "../../../database/models/workspace.model";
import Flow from "../../../database/models/flow.model";
import Project from "../../../database/models/project.model";
import { RequestWithPayload } from "../../../types/express";
import { Types } from "mongoose";

export const checkProjectOwnerAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (<RequestWithPayload>req).user._id;
    const projectId = req.params.project_id;
    const project = await Project.findById(projectId);

    if (!project) {
      next(new APIError("Project not found when checking owner access.", 400));
    } else {
      if (project.createdBy !== userId) {
        console.log("nasıl buraya girdim");
        return next(new APIError("Only owner can handle this operation", 403));
      }
      return next();
    }
  },
);
export const checkFlowOwnerAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (<RequestWithPayload>req).user._id;
    const flowId = req.params.flow_id;
    const flow = await Flow.findById(flowId);
    if (!flow) {
      next(new APIError("Flow not found when checking owner access.", 400));
    } else {
      if (flow && flow.createdBy !== userId) {
        return next(new APIError("Only owner can handle this operation", 403));
      }
      return next();
    }
  },
);
export const checkWorkspaceOwnerAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (<RequestWithPayload>req).user._id;
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      next(
        new APIError("Workspace not found when checking owner access.", 400),
      );
    } else {
      if (workspace.createdBy !== userId) {
        return next(new APIError("Only owner can handle this operation", 403));
      }
      return next();
    }
  },
);

export const checkAdminAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = (<RequestWithPayload>req).user;
    const user = await User.findById(_id);
    if (user?.role !== "admin") {
      return next(new APIError("Only admins can access this route", 403));
    }
    next();
  },
);

export const checkIsOwn = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const me = (<RequestWithPayload>req).user._id;
    const deletingUser = req.params.user_id as unknown as Types.ObjectId;
    if (me === deletingUser) {
      return next(new APIError("User cannot delete yourself", 400));
    }
    next();
  },
);
