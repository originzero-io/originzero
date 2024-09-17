import EntityManagerService from "../entityManagerService.http";

class FlowGroupService extends EntityManagerService {
  async getGroups(flow_id) {
    const response = await this.service.get(`/flows/groups/${flow_id}`);
    return response.data;
  }

  async createGroup(flow_id, group) {
    const response = await this.service.post(`/flows/groups/${flow_id}`, group);
    return response.data;
  }

  async updateGroup(group) {
    const response = await this.service.put(`/flows/groups/${group._id}`, group);
    return response.data;
  }

  async deleteGroup(group) {
    const response = await this.service.delete(`/flows/groups/${group._id}`);
    return response.data;
  }
}

export default new FlowGroupService();
