import { Types } from "mongoose";
import FlowModel, { Flow } from "../../database/models/flow.model";
import IRepository from "../../database/base.repository";
import APIError from "../../utils/APIError";

class FlowRepository extends IRepository<Flow> {
  async getAll() {
    const flows = await this.model
      .find({})
      .populate("workspace", "name")
      .populate("project", "name")
      .populate("createdBy", "name username avatar role online");

    return flows;
  }

  async get(flowId: Types.ObjectId) {
    const flow = await this.model
      .findById(flowId)
      .populate("workspace", "name")
      .populate("project", "name")
      .populate("createdBy", "name username avatar role online");
    return flow;
  }

  async getByWorkspace(workspaceId: Types.ObjectId) {
    const flows = this.model
      .find({ workspace: workspaceId })
      .populate("workspace", "name")
      .populate("project", "name")
      .populate("createdBy", "name username avatar role online");

    return flows;
  }

  async getByProject(projectId: Types.ObjectId) {
    const flows = this.model
      .find({ project: projectId })
      .populate("workspace")
      .populate("project")
      .populate("createdBy", "name username avatar role online");

    return flows;
  }

  async create(flow: Flow) {
    const flowRecord = await this.createBase(flow);
    await flowRecord.populate("workspace");
    await flowRecord.populate("project", "name");
    await flowRecord.populate("createdBy", "name username avatar role online");
    return flowRecord;
  }

  async update(flowId: Types.ObjectId, newConfig: Flow) {
    const flow = await this.updateBase(flowId, newConfig);
    if (flow) {
      await flow.populate("workspace", "name");
      await flow.populate("project", "name");
      await flow.populate("createdBy", "name username avatar role online");
      return flow;
    }
    throw new APIError("Flow not found", 400);
  }

  async moveToAnotherProject(
    flowId: Types.ObjectId,
    newProjectId: Types.ObjectId,
  ) {
    const flow = await this.updateBase(flowId, { project: newProjectId });
    if (flow) {
      await flow.populate("workspace", "name");
      await flow.populate("project", "name");
      await flow.populate("createdBy", "name username avatar role online");
      return flow;
    }
    throw new APIError("Flow not found", 400);
  }
}

export default new FlowRepository(FlowModel);
