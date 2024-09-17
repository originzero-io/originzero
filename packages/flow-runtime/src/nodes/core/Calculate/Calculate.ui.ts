/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import { Node } from "../../types";
import Calculate from "./Calculate.node";

const CALCULATE: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
    dynamicInput: true,
    dynamicOutput: true,
  },
  configParameters: [
    {
      tab: "Equations",
      groups: [
        {
          name: "Data",
          formData: [
            {
              type: "mathquill",
              name: "formula",
              label: "Formula:",
              placeholder: "Enter your equation",
              defaultValue: "f\\left(x\\right)=x^2",
              required: true,
            },
            {
              type: "number",
              name: "decimal_point",
              label: "Decimal Point:",
              // placeholder: "Enter your equation",
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  // configParameters: {
  //   formula: "f\\left(x\\right)=x^2",
  //   decimal_point: 0,
  // },
  inputParameters: {
    // param1: "any",
  },
  outputValues: {
    result: "any",
  },
  ui: {
    label: "Calculate",
    category: "Functional",
    icon: "Calculate.icon.svg",
  },
  class: Calculate,
};

export default CALCULATE;
