import React, { createContext, useContext } from "react";
import FlowEvent from "services/entityManagerService/flowService/flowService.event";
import WorkspaceEvent from "services/entityManagerService/workspaceService/workspaceService.event";
import ProjectEvent from "services/entityManagerService/projectService/projectService.event";
import NoteEvent from "services/entityManagerService/noteService/noteService.event";
import UserEvent from "services/entityManagerService/userService/userService.event";
import userInitialListener from "services/entityManagerService/userService/userService.initialListener";
import flowInitialListener from "services/entityManagerService/flowService/flowService.initialListener";
import projectInitialListener from "services/entityManagerService/projectService/projectService.initialListener";
import workspaceInitialListener from "services/entityManagerService/workspaceService/workspaceService.initialListener";
import noteInitialListener from "services/entityManagerService/noteService/noteService.initialListener";
import useAuth from "utils/hooks/useAuth";
import PropTypes from "prop-types";
import SocketConnectionManager from "../services/SocketConnectionManager";

const EntityManagerSocketContext = createContext();

export const useEntityManagerSocket = () => useContext(EntityManagerSocketContext);

export const EntityManagerSocketProvider = ({ children }) => {
  const auth = useAuth();

  let entityManagerSocket = null;

  let workspaceEvent = null;
  let projectEvent = null;
  let flowEvent = null;
  let noteEvent = null;
  let userEvent = null;

  if (auth.isAuthenticated) {
    entityManagerSocket = new SocketConnectionManager({
      url: import.meta.env.VITE_ENTITY_MANAGER_SERVICE_URL,
    });

    entityManagerSocket.connect();

    workspaceEvent = new WorkspaceEvent(entityManagerSocket.socket);
    projectEvent = new ProjectEvent(entityManagerSocket.socket);
    flowEvent = new FlowEvent(entityManagerSocket.socket);
    noteEvent = new NoteEvent(entityManagerSocket.socket);
    userEvent = new UserEvent(entityManagerSocket.socket);

    workspaceInitialListener(workspaceEvent);
    projectInitialListener(projectEvent);
    flowInitialListener(flowEvent);
    noteInitialListener(noteEvent);
    userInitialListener(userEvent);
  }

  const value = {
    entityManagerSocket,
    workspaceEvent,
    projectEvent,
    flowEvent,
    noteEvent,
    userEvent,
  };

  return (
    <EntityManagerSocketContext.Provider value={value}>
      {children}
    </EntityManagerSocketContext.Provider>
  );
};

EntityManagerSocketProvider.propTypes = {
  children: PropTypes.element,
};
