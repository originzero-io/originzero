import { Node } from "../../types";
import Notification from "./Notification.node";

const NOTIFICATION: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 0,
    dynamicInput: false,
    dynamicOutput: false,
  },
  statusHandles: {
    outputs: {
      end: true,
    },
  },
  configParameters: [],
  inputParameters: {
    value: "any",
  },
  ui: {
    label: "Notification",
    category: "Common",
    icon: "Notification.icon.svg",
  },
  class: Notification,
};

export default NOTIFICATION;
