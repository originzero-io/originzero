import { Node } from "../../types";
import MotorSpeedNode from "./MotorSpeed.node";

const MotorSpeed: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 0,
    dynamicInput: false,
    dynamicOutput: false,
  },
  configParameters: [
    {
      tab: "Settings",
      groups: [
        {
          name: "Data",
          formData: [
            {
              type: "number",
              name: "v_start",
              label: "V Start:",
              defaultValue: 10000,
              required: true,
            },
            {
              type: "number",
              name: "v_stop",
              label: "V Stop:",
              defaultValue: 10000,
              required: true,
            },
            {
              type: "number",
              name: "v_max",
              label: "V Max:",
              defaultValue: 100000,
              required: true,
            },
            {
              type: "number",
              name: "a_max",
              label: "A Max:",
              defaultValue: 10000,
              required: true,
            },
            {
              type: "number",
              name: "d_max",
              label: "D Max:",
              defaultValue: 10000,
              required: true,
            },
            {
              type: "number",
              name: "a1",
              label: "A1:",
              defaultValue: 9000,
              required: true,
            },
            {
              type: "number",
              name: "d1",
              label: "D1:",
              defaultValue: 9000,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  statusHandles: {
    outputs: {
      start: false,
      end: false,
    },
  },
  outputValues: {
    speed: "any",
  },
  ui: {
    label: "Motor Speed",
    category: "Device",
    icon: "MotorSpeed.icon.svg",
  },
  class: MotorSpeedNode,
};

export default MotorSpeed;
