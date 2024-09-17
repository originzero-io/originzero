import { Node } from "../../types";
import Constant from "./Constant.node";

const CONSTANT: Node["data"] = {
  ioEngine: {
    targetCount: 0,
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
              type: "dynamic",
              name: "message",
              label: "Message:",
              placeholder: "Variable",
              // defaultValue: 5,
              defaultInputType: "number",
              required: true,
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
    label: "Constant",
    category: "Common",
    icon: "Constant.icon.svg",
  },
  class: Constant,
};

export default CONSTANT;
