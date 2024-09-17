import React, { createContext, useContext, useEffect } from "react";
import FlowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import PropTypes from "prop-types";
import flowExecutorInitialListener from "../services/flowExecutorService/flowExecutor.initialListener";
import SocketConnectionManager from "../services/SocketConnectionManager";

const FlowExecutorSocketContext = createContext();

export const useFlowExecutorSocket = () => useContext(FlowExecutorSocketContext);

export const FlowExecutorSocketProvider = ({ children }) => {
  //   const flowExecutorSocket = new SocketConnectionManager({
  //     url: `http://localhost:${flowConfig}`,
  //   });

  const flowExecutorSocket = new SocketConnectionManager({
    url: import.meta.env.VITE_FLOW_EXECUTOR_SERVICE_URL,
  });

  flowExecutorSocket.connect();

  const flowExecutorEvent = new FlowExecutorEvent(flowExecutorSocket.socket);

  flowExecutorInitialListener(flowExecutorEvent);

  return (
    <FlowExecutorSocketContext.Provider value={{ flowExecutorSocket, flowExecutorEvent }}>
      {children}
    </FlowExecutorSocketContext.Provider>
  );
};

FlowExecutorSocketProvider.propTypes = {
  children: PropTypes.element,
};
