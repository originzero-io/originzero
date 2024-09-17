import { Node } from "../../types";
import VELOCITY_MODE_CS from "./VELOCITY_MODE.node";

const VELOCITY_MODE: Node["data"] = {
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
    label: "Velocity Mode",
    category: "Device",
    icon: "VELOCITY_MODE.icon.svg",
  },
  class: VELOCITY_MODE_CS,
};

export default VELOCITY_MODE;
