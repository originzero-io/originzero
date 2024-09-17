// import { Types } from "mongoose";
import WorkspaceModel, {
  Workspace,
} from "../../database/models/workspace.model";
import IRepository from "../../database/base.repository";
import UserRepository from "../user/user.repository";
import { AuthPayload } from "../../types/common";
import APIError from "../../utils/APIError";
import { Types } from "mongoose";

class WorkspaceRepository extends IRepository<Workspace> {
  async getMyWorkspaces(user: AuthPayload) {
    if (user.role === "admin") {
      const allWorkspaces = await this.model
        .find({})
        .populate(
          "createdBy",
          "_id name username email role avatar phone online",
        );
      return allWorkspaces;
    }
    const userRecord = await UserRepository.getById(user._id);
    if (userRecord) {
      const workspaceIds = userRecord.workspaces.map(
        (workspace) => workspace._id,
      );
      const memberedWorkspaces = await this.model.find({
        _id: { $in: workspaceIds },
      });
      return memberedWorkspaces;
    }
    throw new APIError("User not found when getting workspaces", 400);
  }

  async create(workspace: Workspace) {
    const entityRecord = new this.model({
      _id: new Types.ObjectId(),
      ...workspace,
    });
    await entityRecord.save();
    return entityRecord;
  }
}

export default new WorkspaceRepository(WorkspaceModel);
