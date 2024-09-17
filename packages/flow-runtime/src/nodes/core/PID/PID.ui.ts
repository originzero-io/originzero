import { Node } from "../../types";
import PIDNode from "./PID.node";

const PID: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 0,
    dynamicInput: false,
    dynamicOutput: false,
  },
  configParameters: [
    {
      tab: "PID Constants",
      groups: [
        {
          name: "Parameters",
          formData: [
            {
              type: "number",
              name: "kp",
              label: "Kp:",
              placeholder: "kp constant",
              defaultValue: 20,
              required: true,
            },
            {
              type: "number",
              name: "ki",
              label: "Ki:",
              placeholder: "ki constant",
              defaultValue: 0,
              required: true,
            },
            {
              type: "number",
              name: "kd",
              label: "Kd:",
              placeholder: "kd constant",
              // defaultValue: 50,
              required: true,
            },
            {
              type: "number",
              name: "filter",
              label: "Filter:",
              placeholder: "filter constant",
              defaultValue: 3000,
              required: true,
            },
            {
              type: "select",
              name: "onoff",
              label: "On/Off:",
              placeholder: "on/off constant",
              defaultValue: "on",
              options: [
                { value: "on", label: "ON" },
                { value: "off", label: "OFF" },
              ],
              required: true,
            },
          ],
        },
      ],
    },
    {
      tab: "Others",
      groups: [
        {
          name: "Settings",
          formData: [
            {
              type: "text",
              name: "description",
              label: "Description",
              placeholder: "Enter description",
              // defaultValue: 20,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  // configParameters: {
  //   Kp: 20,
  //   Ki: 0,
  //   Kd: 50,
  //   filter: 3000,
  //   on_off: "on",
  // },
  statusHandles: {
    inputs: {
      stop: true,
    },
    outputs: {
      start: false,
      end: false,
    },
  },
  inputParameters: {
    SetPoint: "int",
  },
  outputValues: {
    pid: "any",
  },
  ui: {
    label: "PID",
    category: "Functional",
    icon: "PID.icon.svg",
  },
  class: PIDNode,
};

export default PID;
