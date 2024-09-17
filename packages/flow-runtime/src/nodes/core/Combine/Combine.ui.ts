import { Node } from "../../types";
import Combine from "./Combine.node";

const COMBINE: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
    dynamicInput: true,
    dynamicOutput: true,
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
              name: "space_character",
              label: "Space Character:",
              // placeholder: "Enter your data you want to inject",
              defaultValue: ",",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  inputParameters: {
    value1: "string",
    value2: "string",
  },
  outputValues: {
    result: "string",
  },
  ui: {
    label: "Combine",
    category: "Functional",
    icon: "Combine.icon.svg",
  },
  class: Combine,
};

export default COMBINE;
