/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import {
  Form,
  Input,
  Collapse,
  Checkbox,
  Radio,
  DatePicker,
  Select,
  Slider,
  Switch,
  TimePicker,
  InputNumber,
  Tabs,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { EditableMathField, addStyles } from "react-mathquill";
import CalculateNodeConfigParameters from "./SpecialNodes/CalculateNode/CalculateNodeConfigParameters";
import ConditionNodeConfigParameters from "./SpecialNodes/ConditionNode/ConditionNodeConfigParameters";
import MathKeyboard from "./SpecialNodes/CalculateNode/MathKeyboard";
import MathVariables from "./SpecialNodes/CalculateNode/MathVariables";

export default function ConfigParametersForm({ node, dispatcher, form }) {
  const { configParameters } = node.data;

  const onChangeConfigParametersHandler = (tabName, groupName, item, event) => {
    let newConfigParametersPayload = { name: "", value: "" };

    // console.log("-------ONCHANGEEEEE-------");
    // console.log("item.name", item.name);
    // console.log("event", event);
    // console.log("tabName", tabName);
    // console.log("groupName", groupName);
    switch (item.type) {
      case "text":
        form.setFieldsValue({ [item.name]: event.target.value });
        newConfigParametersPayload = {
          name: event.target.name,
          value: event.target.value,
        };
        break;
      case "number":
        if (typeof event === "string") {
          //*  if event is unit
          dispatcher({
            type: "updateParameterUnit",
            payload: {
              tabName,
              groupName,
              formItemName: item.name,
              unitValue: event,
            },
          });
        } else {
          //* if event is number
          form.setFieldsValue({ [item.name]: event });
          newConfigParametersPayload = {
            name: item.name,
            value: event,
          };
        }
        break;
      case "checkbox":
        form.setFieldsValue({ [item.name]: event.target.checked });
        newConfigParametersPayload = {
          name: event.target.name,
          value: event.target.checked,
        };
        break;
      case "radio":
        form.setFieldsValue({ [item.name]: event.target.value });
        newConfigParametersPayload = {
          name: event.target.name,
          value: event.target.value,
        };
        break;
      case "slider":
        form.setFieldsValue({ [item.name]: event });
        newConfigParametersPayload = {
          name: item.name,
          value: event,
        };
        break;
      case "switch":
        form.setFieldsValue({ [item.name]: event });
        newConfigParametersPayload = {
          name: item.name,
          value: event,
        };
        break;
      case "date":
        form.setFieldsValue({ [item.name]: event });
        newConfigParametersPayload = {
          name: item.name,
          value: event,
        };
        break;
      case "time":
        form.setFieldsValue({ [item.name]: event });
        newConfigParametersPayload = {
          name: item.name,
          value: event,
        };
        break;
      case "select":
        form.setFieldsValue({ [item.name]: event });
        newConfigParametersPayload = {
          name: item.name,
          value: event,
        };
        break;
      case "dynamic":
        form.setFieldsValue({ [item.name]: event.target.value });

        //* if value is number
        if (event.target.value / 10) {
          newConfigParametersPayload = {
            name: item.name,
            value: parseFloat(event.target.value),
          };
        } else {
          newConfigParametersPayload = {
            name: item.name,
            value: event.target.value,
          };
        }
        break;
      case "mathquill":
        newConfigParametersPayload = {
          name: item.name,
          value: event.latex(),
        };
        break;
      default:
        break;
    }

    const newConfigDispatcher = {
      type: "updateConfigParameters",
      payload: {
        tabName,
        groupName,
        formItemName: newConfigParametersPayload.name,
        formItemValue: newConfigParametersPayload.value,
      },
    };
    dispatcher(newConfigDispatcher);
  };

  const [tabbedParameters, setTabbedParameters] = useState([]);

  useEffect(() => {
    setTabbedParameters(configParameters);
  }, [configParameters]);

  const createDefaultActiveKeys = (tab) => {
    // ? [0,1 ,..., tabCount]
    const defaultActiveKeys = Array.from({ length: tab.groups.length }, (_, index) => index);
    return defaultActiveKeys;
  };

  return (
    <div>
      <Form
        form={form}
        name="configParametersForm"
        labelCol={{ flex: "160px" }}
        labelAlign="left"
        labelWrap
        initialValues={tabbedParameters.reduce((acc, tab) => {
          tab.groups.forEach((group) => {
            group.formData.forEach((item) => {
              if (item.value !== undefined) {
                acc[item.name] = item.value;
              } else if (item.defaultValue !== undefined) {
                acc[item.name] = item.defaultValue;
              } else {
                acc[item.name] = undefined;
              }
            });
          });
          form.setFieldsValue(acc);
          return acc;
        }, {})}
        colon={true} // Used with label, whether to display : after label text.
      >
        <Tabs
          // tabPosition="left"
          type="card"
          defaultActiveKey="1"
          items={tabbedParameters.map((tab, tabIndex) => ({
            label: tab.tab,
            forceRender: true, // tüm tabler render edilsin
            key: String(tabIndex),
            children: tab.groups.map((group, groupIndex) => (
              <Collapse
                defaultActiveKey={() => createDefaultActiveKeys(tab)} // open all panels
                key={`collapse-${groupIndex}`}
                items={[
                  {
                    key: String(groupIndex),
                    label: group.name,
                    children: (
                      <div key={`group-contents-${groupIndex}`}>
                        {group.formData.map((item, itemIndex) => (
                          <Form.Item
                            key={`item-${itemIndex}`}
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.required,
                                message: "Please fill the blank",
                              },
                            ]}
                          >
                            {/* {node.type === "CALCULATE" && item.name === "formula" && (
                              <CalculateNodeConfigParameters
                                node={node}
                                tabName={tab.tab}
                                groupName={group.name}
                                dispatcher={dispatcher}
                              />
                            )} */}
                            <HTMLInput
                              tabName={tab.tab}
                              groupName={group.name}
                              data={{
                                ...item,
                                onChange: (event) =>
                                  onChangeConfigParametersHandler(tab.tab, group.name, item, event),
                              }}
                            />
                          </Form.Item>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            )),
          }))}
        />
      </Form>
    </div>
  );
}

function HTMLInput({ tabName, groupName, data }) {
  const { type, options, ...rest } = data;

  switch (type) {
    case "text":
      if (data.area) {
        return <Input.TextArea {...rest} />;
      }
      return <Input type={type} {...rest} />;
    case "number":
      if (data.unit) {
        return <UnitableInputNumber {...data} style={{ width: "100%" }} />;
      }
      return <InputNumber {...rest} style={{ width: "100%" }} />;
    case "password":
      return <Input.Password type={type} {...rest} />;
    case "checkbox":
      return <Checkbox checked={data.value} defaultChecked={data.defaultValue} {...rest} />;
    case "radio":
      return (
        <Radio.Group {...rest}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case "slider":
      return <Slider {...rest} />;
    case "select":
      return <Select {...rest} className="custom-icon-color" options={options} />;
    case "switch":
      return <Switch {...rest} />;
    case "date":
      if (data.range) {
        return (
          <DatePicker.RangePicker
            {...rest}
            className="custom-icon-color"
            style={{ width: "100%" }}
          />
        );
      }
      return <DatePicker {...rest} className="custom-icon-color" style={{ width: "100%" }} />;

    case "time":
      return <TimePicker {...rest} className="custom-icon-color" style={{ width: "100%" }} />;
    case "dynamic":
      return <DynamicTypeInput {...rest} />;
    case "mathquill":
      return <MathquillInput tabName={tabName} groupName={groupName} {...data} />;
    default:
      return <div>Invalid HTML input</div>;
  }
}

//! gereksiz olabilir
addStyles();
function MathquillInput({ tabName, groupName, ...inputProps }) {
  const { value, defaultValue, onChange } = inputProps;

  const [latex, setLatex] = useState("");
  const [mathField, setMathField] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    if (value) {
      setLatex(value);
    } else {
      setLatex(defaultValue);
    }
  }, []);

  const showKeyboardHandler = () => {
    setShowKeyboard(!showKeyboard);
  };

  const handleMathChange = (mathFieldInstance) => {
    setMathField(mathFieldInstance);
    onChange(mathFieldInstance, tabName, groupName, inputProps);
  };

  return (
    <div>
      <EditableMathField className="math-textbox" latex={latex} onChange={handleMathChange} />
      <Button style={{ width: "150px" }} onClick={showKeyboardHandler}>
        {showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
      </Button>
      {showKeyboard && <MathKeyboard mathField={mathField} />}

      {/* <MathVariables /> */}
    </div>
  );
}

function DynamicTypeInput({ ...inputProps }) {
  //* input can be 'text' or 'number'
  const { defaultInputType, ...rest } = inputProps;
  const [inputType, setInputType] = useState(defaultInputType);
  const changeDataTypeHandler = (value) => {
    setInputType(value);
  };

  return (
    <Input
      {...rest}
      type={inputType}
      addonAfter={
        <Select
          defaultValue="number"
          placeholder="type"
          className="custom-icon-color"
          options={[
            {
              value: "number",
              label: "number",
            },
            {
              value: "text",
              label: "string",
            },
          ]}
          onChange={changeDataTypeHandler}
          style={{ width: "100px" }}
        />
      }
    />
  );
}
function UnitableInputNumber({ ...inputProps }) {
  const { value, ...rest } = inputProps;
  return (
    <InputNumber
      {...inputProps}
      addonAfter={
        <Select
          {...rest}
          defaultValue={rest.unit.value}
          placeholder="unit"
          className="custom-icon-color"
          value={rest.unit.value}
          options={rest.unit.options}
          style={{ width: "100px" }}
        />
      }
    />
  );
}

// return (
//   <div>
//     <Form
//       form={form}
//       name="configParametersForm"
//       labelCol={{ flex: "160px" }}
//       labelAlign="left"
//       labelWrap
//       initialValues={tabbedParameters.reduce((acc, tab) => {
//         tab.groups.forEach((group) => {
//           group.formData.forEach((item) => {
//             if (item.value !== undefined) {
//               acc[item.name] = item.value;
//             } else if (item.defaultValue !== undefined) {
//               acc[item.name] = item.defaultValue;
//             } else {
//               acc[item.name] = undefined;
//             }
//           });
//         });
//         form.setFieldsValue(acc);
//         return acc;
//       }, {})}
//       colon={true} // Used with label, whether to display : after label text.
//     >
//       <Tabs
//         // tabPosition="left"
//         type="card"
//         defaultActiveKey="1"
//         items={tabbedParameters.map((tab, tabIndex) => ({
//           label: tab.tab,
//           forceRender: true, // tüm tabler render edilsin
//           key: String(tabIndex),
//           children: tab.groups.map((group, groupIndex) => (
//             <Collapse
//               defaultActiveKey={() => createDefaultActiveKeys(tab)} // open all panels
//               key={`collapse-${groupIndex}`}
//               items={[
//                 {
//                   key: String(groupIndex),
//                   label: group.name,
//                   children: (
//                     <div key={`group-contents-${groupIndex}`}>
//                       {group.formData.map((item, itemIndex) => (
//                         <Form.Item
//                           key={`item-${itemIndex}`}
//                           name={item.name}
//                           label={item.label}
//                           rules={[
//                             {
//                               required: item.required,
//                               message: "Please fill the blank",
//                             },
//                           ]}
//                         >
//                           <HTMLInput
//                             data={{
//                               ...item,
//                               onChange: (event) =>
//                                 onChangeConfigParametersHandler(tab.tab, group.name, item, event),
//                             }}
//                           />
//                         </Form.Item>
//                       ))}
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           )),
//         }))}
//       />
//     </Form>
//   </div>
// );
