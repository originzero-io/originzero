import EntityManagerService from "../entityManagerService.http";

class WorkspaceService extends EntityManagerService {
  async getAllWorkspaces() {
    const response = await this.service.get("/workspaces");
    return response.data;
  }

  async getMyWorkspaces() {
    const response = await this.service.get("/workspaces/my-workspaces");
    return response.data;
  }
}

export default new WorkspaceService();
