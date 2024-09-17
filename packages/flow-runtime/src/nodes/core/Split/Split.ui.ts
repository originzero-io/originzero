import { Node } from "../../types";
import Split from "./Split.node";

const SPLIT: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
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
              type: "text",
              name: "split_character",
              label: "Split Character:",
              placeholder: "Enter your split character",
              defaultValue: ",",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  inputParameters: {
    value: "string",
  },
  outputValues: {
    result: "string",
  },
  ui: {
    label: "Split",
    category: "Functional",
    icon: "Split.icon.svg",
  },
  class: Split,
};

export default SPLIT;
