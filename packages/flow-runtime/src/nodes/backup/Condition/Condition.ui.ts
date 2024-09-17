import { Node } from "../../types";
import Condition from "./Condition.node";

const CONDITION: Node["data"] = {
  ioEngine: {
    targetCount: 1,
    sourceCount: 1,
    dynamicInput: false,
    dynamicOutput: false,
  },
  configParameters: {
    checkingAllRules: true,
  },
  inputParameters: {
    c1: "any",
    c2: "any",
  },
  outputValues: {
    result: "any",
  },
  ui: {
    label: "Condition",
    category: "Common",
    icon: "Condition.icon.svg",
  },
  class: Condition,
};

export default CONDITION;
