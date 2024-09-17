import { Socket, Server } from "socket.io";
import { Types } from "mongoose";
import ProjectRepository from "./project.repository";
import { Project } from "../../database/models/project.model";

interface Data {
  project: Project;
}

const ProjectHandler = (io: Server, socket: Socket) => {
  const create = async (data: Data) => {
    try {
      console.log("Project create handler!!");
      const project = await ProjectRepository.create(data.project);
      io.emit("projects:create", { project });
    } catch (error: any) {
      socket.emit("projects:create", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  const update = async (data: {
    project: Project;
    projectInfo: { name: string };
  }) => {
    try {
      const projectId = data.project._id as Types.ObjectId;
      const newProject = data.projectInfo;
      const project = await ProjectRepository.update(projectId, newProject);
      io.emit("projects:update", { project });
    } catch (error: any) {
      socket.emit("projects:update", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  const remove = async (data: Data) => {
    try {
      const projectId = await ProjectRepository.deleteBase(
        data.project._id as Types.ObjectId,
      );
      io.emit("projects:delete", { projectId });
    } catch (error: any) {
      socket.emit("projects:delete", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  return { create, update, remove };
};

export default ProjectHandler;
