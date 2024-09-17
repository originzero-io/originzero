import socketio from "socket.io";
import http from "http";
// import NodeList from "../nodes/NodeList";
import { Flow } from "../flow/types";
import FlowStarter from "../flow/core/FlowStarter";
import ElementRepository from "../database/repository/ElementRepository";
import GUISettingsRepository from "../database/repository/GUISettingsRepository";
import { GUISettingsType } from "../database/models/GUISettings";
import getNodeList from "../nodes/helpers/getNodeList";
import { NodeList } from "..";
import { Node } from "../nodes/types";

export let IO: socketio.Server;
export let SOCKET: socketio.Socket;

let executionStatus: "executing" | "paused" | "error" = "paused";

export default (httpServer: http.Server): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      const io: socketio.Server = new socketio.Server(httpServer);
      IO = io;

      io.on("connection", (socket: socketio.Socket) => {
        console.log(`${socket.id} socket connected`);
        SOCKET = socket;

        socket.emit("flow:executionStatus", executionStatus);

        socket.on("nodeList:get", (callback) => {
          console.log("fetching node list...");
          callback(NodeList);
        });

        // flow:entities eventinde hem elements çekilsin hem gui, hepsi birlikte gönderilsin
        socket.on("gui:get", async (callback) => {
          const guiSettings = await GUISettingsRepository.get();
          callback(guiSettings);
        });

        socket.on("gui:save", async (data: GUISettingsType, callback) => {
          try {
            await GUISettingsRepository.save(data);
            callback("GUI Saved");
          } catch (error: any) {
            // socket.emit ile gönderilebilir, error da success notification oluyor
            callback(error.message);
          }
        });

        socket.on("elements:get", async (callback) => {
          const elements = await ElementRepository.get();
          // socket.emit("elements:get", elements);
          callback(elements);
        });

        socket.on("elements:save", async (data, callback) => {
          try {
            await ElementRepository.save(data);
            callback("Elements saved");
          } catch (error: any) {
            callback(error.message);
          }
        });

        socket.on("flow:execute", async (flow: Flow) => {
          try {
            await ElementRepository.save(flow);

            // ? data flow için gerekli olmayan kısımları barındırıyor. Sadeleştirilebilir ?

            await FlowStarter.initialStart(flow);

            socket.emit("flow:execute", "Flow executed");

            executionStatus = "executing";
            io.emit("flow:executionStatus", executionStatus);
          } catch (error: any) {
            socket.emit("flow:execute", {
              isError: true,
              errorMessage: error.message,
            });

            executionStatus = "error";
            io.emit("flow:executionStatus", executionStatus);
          }
        });

        socket.on("flow:startByTrigger", (trigger: Node) => {
          FlowStarter.startByTrigger(trigger);
        });

        socket.on("flow:stop", (callback) => {
          FlowStarter.stop();
          console.log("EXECUTION HAS BEEN STOPPED BY USER", socket.id);
          callback("Execution stopped");

          executionStatus = "paused";
          io.emit("flow:executionStatus", executionStatus);
        });

        socket.on("disconnect", (reason) => {
          console.log(`${socket.id} disconnected with this reason: `, reason);
        });
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
