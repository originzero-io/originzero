import EntityManagerService from "../entityManagerService.http";

class UserService extends EntityManagerService {
  async getAllUsers() {
    const response = await this.service.get("/users");
    return response.data;
  }

  async addUserToWorkspace(user, workspace) {
    const response = await this.service.post(`/users/${user._id}/workspace`, {
      workspace_id: workspace._id,
    });
    return response.data;
  }

  async removeUserToWorkspace(user, workspace) {
    // body object should send with "data" key in delete requests
    const response = await this.service.delete(`/users/${user._id}/workspace`, {
      data: { workspace_id: workspace._id },
    });
    return response.data;
  }

  async editUser(user) {
    const response = await this.service.put(`/users/${user._id}`, user);
    return response.data;
  }

  async deleteUser(user) {
    const response = await this.service.delete(`/users/${user._id}`);
    return response.data;
  }
}

export default new UserService();
