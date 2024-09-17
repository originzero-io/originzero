import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler";
import { Types } from "mongoose";
import PermissionRepository, { PresetService } from "./permission.repository";

class PermissionController {
  getAllPermissions = asyncErrorWrapper(async (req: Request, res: Response) => {
    const permissions = await PermissionRepository.getAll();
    res.status(200).send(permissions);
  });

  getAllPresets = asyncErrorWrapper(async (req: Request, res: Response) => {
    const presets = await PresetService.getAll();
    res.status(200).send(presets);
  });

  getPreset = asyncErrorWrapper(async (req: Request, res: Response) => {
    const presetId = req.params.preset_id as unknown as Types.ObjectId;
    const preset = await PresetService.getById(presetId);
    res.status(200).send(preset);
  });

  createPreset = asyncErrorWrapper(async (req: Request, res: Response) => {
    const preset = await PresetService.save(req.body);
    res.status(200).send(preset);
  });

  getUserPermissionInThisWorkspace = asyncErrorWrapper(
    async (req: Request, res: Response) => {
      const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
      const userId = req.params.workspace_id as unknown as Types.ObjectId;
      const permission =
        await PermissionRepository.getUserPermissionInThisWorkspace(
          workspaceId,
          userId,
        );
      res.status(200).send(permission);
    },
  );

  savePermission = asyncErrorWrapper(async (req: Request, res: Response) => {
    const permission = await PermissionRepository.save(req.body);
    res.status(201).send(permission);
  });
}

export default new PermissionController();
