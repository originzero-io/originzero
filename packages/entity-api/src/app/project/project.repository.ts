import { Types } from "mongoose";
import ProjectModel, { Project } from "../../database/models/project.model";
import IRepository from "../../database/base.repository";
import APIError from "../../utils/APIError";

class ProjectRepository extends IRepository<Project> {
  async create(project: Project) {
    const projectRecord = await this.createBase(project);
    await projectRecord.populate("workspace");
    await projectRecord.populate("createdBy", "username avatar");
    return projectRecord;
  }

  async update(projectId: Types.ObjectId, newProject: { name: string }) {
    const project = await this.updateBase(projectId, newProject);
    if (project) {
      await project.populate("workspace");
      await project.populate("createdBy", "username avatar");
      return project;
    }
    throw new APIError("Project not found", 400);
  }

  async getByWorkspace(workspaceId: Types.ObjectId) {
    const projects = await this.model
      .find({ workspace: workspaceId })
      .populate("workspace")
      .populate("createdBy");
    return projects;
  }
}
export default new ProjectRepository(ProjectModel);
