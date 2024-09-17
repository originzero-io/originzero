import store from "index";
import EntityManagerService from "../entityManagerService.http";

class PermissionService extends EntityManagerService {
  async getAllPermissions() {
    const response = await this.service.get("/permissions");
    return response.data;
  }

  async getUserPermissionInThisWorkspace(workspaceId, userId) {
    const response = await this.service.get(`/permissions/workspace/${workspaceId}/user/${userId}`);
    return response.data;
  }

  async savePermission(permission) {
    const response = await this.service.post("/permissions", permission);
    return response.data;
  }

  async getPresets() {
    const response = await this.service.get("/permissions/presets");
    return response.data;
  }

  async createPreset(preset) {
    const { auth, workspaces } = store.getState();
    const data = {
      workspaceId: workspaces.activeWorkspace._id,
      createdBy: auth._id,
      ...preset,
    };
    const response = await this.service.post("/permissions/presets", data);
    return response.data;
  }
}

export default new PermissionService();
