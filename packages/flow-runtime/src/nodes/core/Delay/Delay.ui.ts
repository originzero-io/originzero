import { Node } from "../../types";
import Delay from "./Delay.node";

const DELAY: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
    dynamicInput: true,
    dynamicOutput: true,
  },
  statusHandles: {
    outputs: {
      start: true,
      end: true,
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
              type: "number",
              name: "timeout",
              label: "Timeout:",
              placeholder: "Delay timeout",
              // defaultValue: 1,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  outputValues: {
    done: "any",
  },
  ui: {
    label: "Delay",
    category: "Intervals & Timers",
    icon: "Delay.icon.svg",
  },
  class: Delay,
};

export default DELAY;
