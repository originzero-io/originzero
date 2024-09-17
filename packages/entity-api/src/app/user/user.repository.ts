import { Types } from "mongoose";
import UserModel, { User } from "../../database/models/user.model";
import IRepository from "../../database/base.repository";
import APIError from "../../utils/APIError";

class UserRepository extends IRepository<User> {
  async setOnline(userId: Types.ObjectId, onlineStatus: User["online"]) {
    const user = await this.model.findById(userId);
    if (user) {
      user.online = onlineStatus;
      await user.save();
      return user;
    }
    throw new APIError("User not found", 400);
  }

  async addUserToWorkspace(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
  ) {
    const user = await this.model.findById(userId);

    if (user) {
      user.workspaces.push(workspaceId);
      await user.save();
      return user;
    }
    throw new APIError("User not found", 400);
  }

  async removeUserToWorkspace(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
  ) {
    const user = await this.model.findById(userId);
    await this.model.findOneAndUpdate(
      { _id: userId },
      { $pull: { workspaces: workspaceId } },
      { new: true }, // Yenilenmiş kullanıcıyı döndürmek için
    );
    return user;
  }
}

export default new UserRepository(UserModel);
