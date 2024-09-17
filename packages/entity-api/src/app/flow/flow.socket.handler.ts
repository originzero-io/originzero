// ? namespace = this.nsp (io) = io
// ? socket.emit(topic,message) direct to client
// ? socket.broadcast.emit(topic,message) send message to everyone who in namespace except client that has requested
// ? io.emit(topic,message) send message to everyone who in namespace
import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import FlowRepository from "./flow.repository";
import { Flow } from "../../database/models/flow.model";

const FlowHandler = (io: Server, socket: Socket) => {
  const create = async (data: { flow: Flow }) => {
    try {
      const flow = await FlowRepository.create(data.flow);
      io.emit("flows:create", { flow });
    } catch (error: any) {
      socket.emit("flows:create", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  const update = async (data: {
    flow: { _id: Types.ObjectId };
    flowConfig: any;
  }) => {
    try {
      const id = data.flow._id;
      const newConfig = data.flowConfig;
      console.log("ID: ", id);
      console.log("NEWCONFIG: ", newConfig);
      const flow = await FlowRepository.update(id, newConfig);
      io.emit("flows:update", { flow });
    } catch (error: any) {
      socket.emit("flows:update", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  const move = async (data: {
    flow: { _id: Types.ObjectId };
    newProject: Types.ObjectId;
  }) => {
    try {
      const id = data.flow._id;
      const newProjectId = data.newProject;
      const flow = await FlowRepository.moveToAnotherProject(id, newProjectId);
      io.emit("flows:move", { flow });
    } catch (error: any) {
      socket.emit("flows:move", { isError: true, errorMessage: error.message });
    }
  };
  const remove = async (data: { flow: { _id: Types.ObjectId } }) => {
    try {
      const flowId = await FlowRepository.deleteBase(data.flow._id);
      io.emit("flows:delete", { flowId });
    } catch (error: any) {
      console.log("remove error çalıştı!!");
      socket.emit("flows:delete", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  return { create, update, move, remove };
};
export default FlowHandler;
