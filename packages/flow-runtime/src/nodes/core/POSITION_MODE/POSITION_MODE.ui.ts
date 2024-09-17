import { Node } from "../../types";
import POSITION_MODE_CS from "./POSITION_MODE.node";

const POSITION_MODE: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
    dynamicInput: false,
    dynamicOutput: false,
  },
  statusHandles: {
    outputs: {
      start: true,
      end: true,
      error: false,
    },
  },
  configParameters: [
    {
      tab: "Settings",
      groups: [
        {
          name: "Data",
          formData: [
            {
              type: "select",
              name: "motor",
              label: "Motor:",
              options: [
                { value: 1, label: "Motor 1" },
                { value: 2, label: "Motor 2" },
                { value: 3, label: "Motor 3" },
              ],
              defaultValue: 1,
              required: true,
            },
            {
              type: "number",
              name: "absolutePosition",
              label: "Position (absolute):",
              defaultValue: 52000,
              required: true,
            },
            {
              type: "text",
              name: "brokerUrl",
              label: "Broker Url:",
              placeholder: "mqtt://",
              required: true,
            },
            {
              type: "text",
              name: "topic",
              label: "Topic:",
              placeholder: "topic to subscribe",
              required: true,
            },
            {
              type: "number",
              name: "qos",
              label: "QoS:",
              defaultValue: 0,
              required: true,
            },
            {
              type: "select",
              name: "retain",
              label: "Retain:",
              defaultValue: "true",
              options: [
                { value: "true", label: "True" },
                { value: "false", label: "False" },
              ],
              required: true,
            },
            {
              type: "text",
              name: "username",
              label: "Username:",
              defaultValue: "test_user",
              required: true,
            },
            {
              type: "password",
              name: "password",
              label: "Password:",
              defaultValue: "1234",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  inputParameters: {
    data: "any",
  },
  ui: {
    label: "Position Mode",
    category: "Device",
    icon: "POSITION_MODE.icon.svg",
  },
  class: POSITION_MODE_CS,
};

export default POSITION_MODE;
