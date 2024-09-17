import React, { useEffect, useState } from "react";
import GlobalButtonStyled from "components/StyledComponents/Button";
import notificationHelper from "utils/ui/notificationHelper";
import { MinusCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, Tag } from "antd";
import styled from "styled-components";
import { FaMinusCircle } from "react-icons/fa";

import { InputStyled, SectionName } from "../../../NodeConfigMenu.style";
import { BsPlusSquare, BsXCircleFill } from "react-icons/bs";

const VariableListContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const VariableItem = styled.div`
  padding: 4px;
  background-color: rgba(85, 243, 29, 0.2);
  color: #65cd1a;
  margin: 4px;
  width: 40px;
  text-align: center;
  border-radius: 4px;
`;

const operands = ["==", "!=", "<", ">", "<=", ">="];

export default function ConditionNodeConfigParameters({ node, dispatcher, form }) {
  const [variables, setVariables] = useState([]);

  // const [form] = Form.useForm();

  useEffect(() => {
    const inputParameterNames = Object.keys(node.data.inputParameters);
    setVariables(inputParameterNames);
  }, [node.data.inputParameters]);

  const addNewRuleHandler = (event) => {
    event.preventDefault();
    const variableName = prompt("Variable name: ");
    const alreadyExist = variables.find((variable) => variable === variableName);

    if (variableName && !alreadyExist) {
      const variablesObj = {};
      [...variables, variableName].forEach((variable) => (variablesObj[variable] = "any"));

      dispatcher({
        type: "addInputParameter",
        payload: variablesObj,
      });
    } else if (alreadyExist) {
      notificationHelper.error("A variable with this name already exists. Give another name.");
    } else if (!variableName) {
      notificationHelper.error("Variable name should not be null.");
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleSubmit = (values) => {
    form.submit();
  };
  return (
    <div>
      <SectionName>Variables</SectionName>
      <VariableListContainer>
        {variables.map((variable) => (
          <VariableItem key={variable}>{variable}</VariableItem>
        ))}
        <GlobalButtonStyled onClick={addNewRuleHandler}>+</GlobalButtonStyled>
      </VariableListContainer>

      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <select
          style={{
            width: "25%",
            background: "#262626",
            border: "1px solid #3a3a3a",
            color: "#c1c1c1",
            textAlign: "center",
          }}
        >
          {variables.map((variable) => (
            <option key={variable}>{variable}</option>
          ))}
        </select>
        <select
          style={{
            width: "25%",
            background: "#262626",
            border: "1px solid #3a3a3a",
            color: "#c1c1c1",
            textAlign: "center",
          }}
        >
          {operands.map((operand) => (
            <option key={operand}>{operand}</option>
          ))}
        </select>
        <InputStyled
          style={{ width: "48%" }}
          // id={entry[0]}
          // name={entry[0]}
          // type={typeof entry[1]}
          // value={entry[1]}
          // onChange={(event) => onChangeConfigParametersHandler(event, typeof entry[1])}
        />
      </div> */}

      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.List name="rules">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }, i) => (
                <div
                  key={key}
                  style={{
                    marginBottom: "5px",
                    // background: "red",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "variable1"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    style={{ width: "20%" }}
                  >
                    <Select>
                      {variables.map((variable) => (
                        <Select.Option key={variable}>{variable}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "operand"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    style={{ width: "20%" }}
                  >
                    <Select>
                      {operands.map((operand) => (
                        <Select.Option key={operand}>{operand}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "variable2"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    style={{ width: "50%" }}
                  >
                    <InputStyled />
                  </Form.Item>
                  <Form.Item style={{ width: "5%", color: "#c1c1c1" }}>
                    <BsXCircleFill
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={() => remove(name)}
                    />
                  </Form.Item>
                </div>
              ))}
              <Form.Item style={{ marginBottom: "20px" }}>
                <GlobalButtonStyled onClick={() => add()} style={{ width: "100%", padding: "6px" }}>
                  Add New Rule
                </GlobalButtonStyled>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
}
