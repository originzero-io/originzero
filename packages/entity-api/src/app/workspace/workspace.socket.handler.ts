import { Socket, Server } from "socket.io";
import { Types } from "mongoose";
import WorkspaceRepository from "./workspace.repository";
import { Workspace } from "../../database/models/workspace.model";

const WorkspaceHandler = (io: Server, socket: Socket) => {
  const create = async (data: { workspace: Workspace }) => {
    try {
      const workspace = await WorkspaceRepository.createBase(data.workspace);
      socket.emit("workspaces:create", { workspace });
    } catch (error: any) {
      socket.emit("workspaces:create", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  const update = async (data: {
    workspace: Workspace;
    workspaceInfo: { name: string };
  }) => {
    try {
      const workspaceId = data.workspace._id as Types.ObjectId;
      const newWorkspace = data.workspaceInfo;
      const workspace = await WorkspaceRepository.updateBase(
        workspaceId,
        newWorkspace,
      );
      io.emit("workspaces:update", { workspace });
    } catch (error: any) {
      socket.emit("workspaces:update", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  const remove = async (data: { workspace: Workspace }) => {
    try {
      const workspaceId = await WorkspaceRepository.deleteBase(
        data.workspace._id as Types.ObjectId,
      );
      io.emit("workspaces:delete", { workspaceId });
    } catch (error: any) {
      socket.emit("workspaces:delete", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  return { create, update, remove };
};

export default WorkspaceHandler;
