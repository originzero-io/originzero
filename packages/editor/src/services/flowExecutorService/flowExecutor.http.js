/* eslint-disable no-undef */
import HttpConnectionManager from "services/HttpConnectionManager";

class FlowExecutorHttpService extends HttpConnectionManager {
  constructor(port) {
    super();
    this.service = this.createService({ port });
  }

  async getElements() {
    const response = await this.service.get("/test/elements");
    return response.data;
  }
}

export default FlowExecutorHttpService;
