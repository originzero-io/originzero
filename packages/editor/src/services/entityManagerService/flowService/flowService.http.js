import EntityManagerService from "../entityManagerService.http";

class FlowService extends EntityManagerService {
  async getFlow(flowId) {
    const response = await this.service.get(`/flows/${flowId}`);
    return response.data;
  }

  async getAllFlows() {
    const response = await this.service.get("/flows");
    return response.data;
  }

  async getFlowsByProject(project) {
    const response = await this.service.get(`/flows/project/${project._id}`);
    return response.data;
  }

  async getFlowsByWorkspace(workspace) {
    const response = await this.service.get(`/flows/workspace/${workspace._id}`);
    return response.data;
  }

  async createFlow(flow) {
    const response = await this.service.post("/flows", flow);
    return response.data;
  }

  async deleteFlow(flowId) {
    const response = await this.service.delete(`/flows/${flowId}`);
    return response.data;
  }

  async saveFlowGui(flowId, flow) {
    const response = await this.service.put(`/flows/${flowId}`, flow);
    return response.data;
  }
}

export default new FlowService();
