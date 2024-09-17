/* eslint-disable no-undef */
import HttpConnectionManager from "services/HttpConnectionManager";

export default class EntityManagerService extends HttpConnectionManager {
  constructor() {
    super();
    this.service = this.createService({
      port: 5001,
      basePath: "entity-manager",
    });
  }
}
