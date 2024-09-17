import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const PermissionContext = createContext({});

const propTypes = {
  children: PropTypes.element,
};
export function PermissionProvider({ children }) {
  const [controllers, setControllers] = useState([
    {
      _id: "1",
      name: "Controller 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Controller 2",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "3",
      name: "Controller 3",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "4",
      name: "Controller 4",
      canUse: false,
      canEdit: false,
    },
  ]);
  const [processors, setProcessors] = useState([
    {
      _id: "1",
      name: "Processor 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Processor 2",
      canUse: false,
      canEdit: false,
    },
  ]);
  const value = {
    controllers,
    processors,
  };

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

PermissionProvider.propTypes = propTypes;

export default PermissionContext;
