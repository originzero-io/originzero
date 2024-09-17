import { Model, Types } from "mongoose";
import PermissionModel, {
  Permission,
} from "../../database/models/permission.model";
import PermissionPresetModel from "../../database/models/permission-preset.model";
import IRepository from "../../database/base.repository";

class PermissionRepository extends IRepository<Permission> {
  // if exist update, otherwise create => upsert:true
  async save(permission: Permission) {
    const { workspaceId, userId } = permission;
    const permissionRecord = await this.model.findOneAndUpdate(
      { workspaceId, userId },
      permission,
      {
        upsert: true,
        runValidators: true,
        new: true,
      },
    );
    return permissionRecord;
  }

  async getUserPermissionInThisWorkspace(
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    const permission = await this.model.findOne({
      workspaceId,
      userId,
    });

    return permission;
  }

  async deletePermission(userId: Types.ObjectId, workspaceId: Types.ObjectId) {
    await this.model.deleteOne({ userId, workspaceId });
  }
}
class PresetRepository extends PermissionRepository {
  constructor(model: Model<any>) {
    super(model);
  }
}

export default new PermissionRepository(PermissionModel);
const presetService = new PresetRepository(PermissionPresetModel);
export { presetService as PresetService };
