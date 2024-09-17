type HtmlInputType =
  // | "button"
  | "checkbox"
  // | "color"
  | "date"
  // | "datetime-local"
  // | "email"
  // | "file"
  // | "hidden"
  // | "image"
  | "number"
  | "password"
  | "radio"
  | "slider" // range
  | "switch"
  // | "reset"
  // | "submit"
  | "text"
  | "select"
  | "time";

type CustomHtmlType = "dynamic" | "mathquill";

type BaseHtmlInput = {
  type: HtmlInputType | CustomHtmlType;
  name: string;
  label: string;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required: boolean;
  autocomlete?: boolean;
  title?: string; // inputun üstüne gelindiğinde çıkan bilgi baloncuğu
};

type TextHtmlInput = BaseHtmlInput & {
  area: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

type NumberHtmlInput = BaseHtmlInput & {
  min?: number;
  max?: number;
  step?: number;
  unit?: {
    value: string;
    options: {
      value: string;
      label: string;
    }[];
  };
};

type SelectHtmlInput = BaseHtmlInput & {
  multiple?: boolean;
  showSearch: boolean;
  options: {
    value: string;
    label: string;
  }[];
};

type CheckboxHtmlInput = BaseHtmlInput & {
  checked: boolean;
};

type RadioHtmlInput = CheckboxHtmlInput & {
  options: { value: string | number; label: string }[];
};

type DateHtmlInput = BaseHtmlInput & {
  picker?: "week" | "month" | "quarter" | "year";
  showTime?: boolean;
  range?: boolean; // start-date -> end-date
};

type TimeHtmlInput = DateHtmlInput;

type DynamicTypeHtmlInput = BaseHtmlInput & {
  defaultInputType: "number" | "text";
};
