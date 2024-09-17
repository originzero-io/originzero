/* eslint-disable no-undef */
import HttpConnectionManager from "services/HttpConnectionManager";

class DockerizeService extends HttpConnectionManager {
  constructor() {
    super();
    this.service = this.createService({ port: 5002, basePath: "dockerize" });
  }

  async getAvailablePort() {
    const response = await this.service.get("/free-port");
    return response.data;
  }

  async dockerizeFlow(flowId) {
    const response = await this.service.post(`/flow/${flowId}`);
    return response.data;
  }

  async deleteFlowContainer(flowId) {
    const response = await this.service.delete(`/flow/${flowId}`);
    return response.data;
  }
}

export default new DockerizeService();
