import path from "path";
import { Node } from "../../types";
import Trigger from "./Trigger.node";
import fs from "fs";

const TRIGGER: Node["data"] = {
  ioEngine: {
    targetCount: 0,
    sourceCount: 1,
    dynamicInput: false,
    dynamicOutput: false,
  },
  statusHandles: {
    inputs: {
      clear: false,
    },
    outputs: {
      start: true,
      end: false,
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
              type: "dynamic",
              name: "data",
              label: "Data:",
              placeholder: "Enter your data you want to inject",
              // defaultValue: 5,
              defaultInputType: "number",
              required: true,
            },
            {
              type: "number",
              name: "repeat",
              label: "Repeat:",
              // placeholder: "Enter repeat cycle (in seconds)",
              defaultValue: 3,
              required: true,
              unit: {
                value: "hour",
                options: [
                  { value: "hour", label: "Hour" },
                  { value: "minute", label: "Minute" },
                  { value: "second", label: "Second" },
                ],
              },
            },
            {
              type: "number",
              name: "cycle",
              label: "Cycle:",
              // placeholder: "Enter repeat cycle (in seconds)",
              // defaultValue: 3,
              required: true,
              unit: {
                value: "1ms",
                options: [
                  { value: "1ms", label: "1ms" },
                  { value: "5ms", label: "5ms" },
                  { value: "10ms", label: "10ms" },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  outputValues: {
    value: "any",
  },
  ui: {
    label: "Trigger",
    category: "Common",
    icon: "Trigger.icon.svg",
  },
  class: Trigger,
};

export default TRIGGER;
