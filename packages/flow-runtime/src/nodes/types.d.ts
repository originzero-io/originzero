import { DerivedClassFrom } from "../types/custom";
import BaseNode from "./BaseNode";

export interface NodeSkeleton {
  [NODE_TYPE: string]: Node["data"];
}
export type EdgeData = string | number | boolean | any[] | object | null;
export type IOValueType = "string" | "int" | "boolean" | "array" | "any";

interface InputData {
  [inputName: string]: IOValueType;
}
interface ConfigurationData {
  [configName: string]: IOValueType;
}
interface OutputData {
  [outputName: string]: EdgeData;
}

type StatusOutput = "start" | "end" | "error" | "errorVal";

type ConfigParameter = {
  tab: string;
  groups: Array<{
    name: string;
    formData: Array<
      | TextHtmlInput
      | NumberHtmlInput
      | CheckboxHtmlInput
      | RadioHtmlInput
      | SelectHtmlInput
      | DateHtmlInput
      | TimeHtmlInput
      | DynamicTypeHtmlInput
    >;
  }>;
};

export type Node = {
  id: string;
  type: string;
  data: {
    ioEngine: {
      targetCount: number;
      sourceCount: number;
      dynamicInput: boolean;
      dynamicOutput: boolean;
    };
    statusHandles?: {
      inputs?: {
        [key: string]: boolean;
      };
      outputs?: {
        [key: string]: boolean;
      };
    };
    inputParameters?: {
      [inputName: string]: IOValueType;
    };
    outputValues?: {
      [outputName: string]: IOValueType;
    };
    configParameters?: ConfigParameter[];
    // configParameters?: {
    //   [key: string]: any;
    // };
    trigHandles?: {
      [handleName: string]: boolean;
    };
    triggerAttributes?: "Ignore" | "Restart operation" | "Queue";
    frozenHandles?: string[];
    enable?: true;
    ui: {
      label: string;
      category: string;
      icon?: string | null;
    };
    class: DerivedClassFrom<BaseNode>;
  };
};
export type Edge = {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  data: EdgeData;
};
