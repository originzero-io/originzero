import { Node } from "../../types";
import HttpRequest from "./HttpRequest.node";

const HTTP_REQUEST: Node["data"] = {
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
      error: true,
    },
  },
  configParameters: [
    {
      tab: "Url Section",
      groups: [
        {
          name: "Config",
          formData: [
            {
              type: "text",
              name: "url",
              label: "Url:",
              placeholder: "Enter your url",
              defaultValue: "https://www.google.com.tr",
              required: false,
              area: true,
            },
            {
              type: "radio",
              name: "m-e-t",
              label: "Request Method:",
              // placeholder: "Enter your url",
              // defaultValue: "https://www.google.com.tr",
              required: true,
              options: [
                {
                  value: "get",
                  label: "GET",
                },
                {
                  value: "post",
                  label: "POST",
                },
                {
                  value: "put",
                  label: "PUT",
                },
                {
                  value: "delete",
                  label: "DELETE",
                },
              ],
              // area: true,
            },
            {
              type: "checkbox",
              name: "check",
              label: "Agree:",
              // placeholder: "Enter your number",
              defaultValue: false,
              required: true,
            },
            {
              type: "number",
              name: "num",
              label: "Number:",
              placeholder: "Enter your number",
              defaultValue: 3,
              required: true,
            },
            {
              type: "slider",
              name: "headerCount",
              label: "Header Count:",
              placeholder: "Enter your API Key",
              defaultValue: 30,
              min: 10,
              max: 50,
              required: true,
            },
            {
              type: "switch",
              name: "isValid",
              label: "Is Valid:",
              defaultValue: false,
              required: true,
            },
            {
              type: "date",
              name: "date",
              label: "Date:",
              placeholder: "Enter your Date",
              // defaultValue: 30,
              range: true,
              required: true,
            },
            {
              type: "date",
              name: "dateWTime",
              label: "Date w/ Time:",
              placeholder: "Enter your Date",
              // defaultValue: 30,
              range: true,
              showTime: true,
              required: true,
            },
            {
              type: "time",
              name: "time",
              label: "Time:",
              placeholder: "Enter your time",
              // defaultValue: 30,
              range: true,
              required: true,
            },
          ],
        },
        {
          name: "Method",
          formData: [
            {
              type: "select",
              name: "method",
              label: "Method:",
              placeholder: "Enter your http method",
              defaultValue: "GET",
              required: true,
              showSearch: true,
              options: [
                { value: "get", label: "GET" },
                { value: "post", label: "POST" },
                { value: "put", label: "PUT" },
                { value: "delete", label: "DELETE" },
              ],
            },
            {
              type: "number",
              name: "userId",
              label: "User ID:",
              placeholder: "Enter user ID",
              min: 0,
              max: 5,
              // defaultValue: "https://www.google.com.tr",
              required: true,
            },
          ],
        },
      ],
    },
    {
      tab: "Url Section 2",
      groups: [
        {
          name: "Config 2",
          formData: [
            {
              type: "text",
              name: "server",
              label: "Server:",
              placeholder: "Enter your server name",
              defaultValue: "localhost",
              required: true,
            },
            {
              type: "text",
              name: "apiKey",
              label: "API Key:",
              placeholder: "Enter your API Key",
              // defaultValue: "https://www.google.com.tr",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  inputParameters: {
    url: "string",
  },
  outputValues: {
    response: "any",
  },
  ui: {
    label: "HTTP Request",
    category: "Network",
    icon: "HttpRequest.icon.svg",
  },
  class: HttpRequest,
};
// const HTTP_REQUEST: Node["data"] = {
//   ioEngine: {
//     targetCount: 1,
//     sourceCount: 1,
//     dynamicInput: true,
//     dynamicOutput: true,
//   },
//   statusHandles: {
//     outputs: {
//       start: true,
//       end: true,
//       error: true,
//     },
//   },
//   configParameters: {
//     url: "http://",
//   },
//   inputParameters: {
//     url: "string",
//   },
//   outputValues: {
//     response: "any",
//   },
//   ui: {
//     label: "HTTP Request",
//     category: "Network",
//     icon: "HttpRequest.icon.svg",
//   },
//   class: HttpRequest,
// };

export default HTTP_REQUEST;
