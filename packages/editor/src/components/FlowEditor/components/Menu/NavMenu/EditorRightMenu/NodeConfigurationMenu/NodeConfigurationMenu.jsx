import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlowContext } from "context/FlowDataProvider";
import { deSyncNode, setNodeConfigData } from "store/reducers/flow/flowElementsSlice";
import notificationHelper from "utils/ui/notificationHelper";
import styled from "styled-components";
import { toggleNodeConfigurationMenu } from "store/reducers/menuSlice";
import GlobalButtonStyled from "components/StyledComponents/Button";
import { Form } from "antd";
import ConfigParametersForm from "./ConfigParametersForm/ConfigParametersForm";
import StatusHandlesForm from "./ConfigEventsForm/StatusHandlesForm";
import TriggerForm from "./ConfigEventsForm/TriggerForm";
import HandleCountForm from "./ConfigEventsForm/HandleCountForm";
import FrozenHandlesForm from "./ConfigEventsForm/FrozenHandlesForm";
import IncomersOutgoers from "./IncomersOutgoers";

function nodeConfigReducer(node, { type, payload }) {
  let newNode;
  switch (type) {
    case "loadNode":
      newNode = payload;
      break;
    case "updateConfigParameters":
      newNode = {
        ...node,
        data: {
          ...node.data,
          configParameters: node.data.configParameters.map((tab) => {
            if (tab.tab === payload.tabName) {
              return {
                ...tab,
                groups: tab.groups.map((group) => {
                  if (group.name === payload.groupName) {
                    return {
                      ...group,
                      formData: group.formData.map((item) =>
                        item.name === payload.formItemName
                          ? { ...item, value: payload.formItemValue }
                          : item,
                      ),
                    };
                  }
                  return group;
                }),
              };
            }
            return tab;
          }),
        },
      };
      break;
    case "updateParameterUnit":
      newNode = {
        ...node,
        data: {
          ...node.data,
          configParameters: node.data.configParameters.map((tab) => {
            if (tab.tab === payload.tabName) {
              return {
                ...tab,
                groups: tab.groups.map((group) => {
                  if (group.name === payload.groupName) {
                    return {
                      ...group,
                      formData: group.formData.map((item) =>
                        item.name === payload.formItemName
                          ? { ...item, unit: { ...item.unit, value: payload.unitValue } }
                          : item,
                      ),
                    };
                  }
                  return group;
                }),
              };
            }
            return tab;
          }),
        },
      };
      break;
    case "updateInputStatusHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          statusHandles: {
            ...node.data.statusHandles,
            inputs: {
              ...node.data.statusHandles.inputs,
              [payload.name]: payload.value,
            },
          },
        },
      };
      break;
    case "updateOutputStatusHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          statusHandles: {
            ...node.data.statusHandles,
            outputs: {
              ...node.data.statusHandles.outputs,
              [payload.name]: payload.value,
            },
          },
        },
      };
      break;
    case "updateTriggerAttributes":
      newNode = {
        ...node,
        data: {
          ...node.data,
          triggerAttributes: payload.value,
        },
      };
      break;
    case "updateHandleCount":
      newNode = {
        ...node,
        data: {
          ...node.data,
          ioEngine: {
            ...node.data.ioEngine,
            [payload.name]: Number(payload.value),
          },
        },
      };
      break;
    case "addInputParameter":
      newNode = {
        ...node,
        data: {
          ...node.data,
          inputParameters: {
            ...node.data.inputParameters,
            ...payload,
          },
        },
      };
      break;
    case "deleteInputParameter":
      newNode = {
        ...node,
        data: {
          ...node.data,
          inputParameters: {
            ...payload,
          },
        },
      };
      break;
    case "freezeHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          frozenHandles: [...node.data.frozenHandles, payload],
        },
      };
      break;
    case "unFreezeHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          frozenHandles: [...node.data.frozenHandles.filter((handle) => handle !== payload)],
        },
      };
      break;
    case "addTriggerHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          trigHandles: {
            ...node.data.trigHandles,
            [payload]: false,
          },
        },
      };
      break;
    case "updateTriggerHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          trigHandles: {
            ...node.data.trigHandles,
            [payload.name]: payload.value,
          },
        },
      };
      break;
    default:
      throw new Error("There are no action in that name");
  }
  return newNode;
}

const ConfigurationTabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #393939;
  border-radius: 6px;
  cursor: pointer;
`;
const ConfigurationTab = styled.div`
  padding: 2px 30px 2px 30px;
  color: ${({ active }) => !active && "#c4c4c4"};
  background-color: ${({ active }) => active && "rgb(64, 64, 64)"};
  flex: 1;
  text-align: center;
`;
const NodeId = styled.div`
  width: 100%;
  background: #393939;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 7px;
  color: #a6b3e8;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 14px;
`;

export default function NodeConfigurationMenu() {
  const { nodeConfigurationMenu } = useSelector((state) => state.menus);
  const [node, nodeConfigDispatch] = useReducer(nodeConfigReducer, nodeConfigurationMenu.element);
  const dispatch = useDispatch();
  const { dynamicInput, dynamicOutput } = node.data.ioEngine;

  const [configurationTab, setConfigurationTab] = useState("Values");
  const [form] = Form.useForm();

  useEffect(() => {
    nodeConfigDispatch({ type: "loadNode", payload: nodeConfigurationMenu.element });
  }, [nodeConfigurationMenu.element, nodeConfigurationMenu.state]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    form
      .validateFields()
      .then((values) => {
        console.log("validated-values: ", values);

        const updatedNodeData = {
          ...node,
          data: {
            ...node.data, // triggers & status handles already come updated
            // update configParameters with validated values, add values property to relevant form item
            configParameters: node.data.configParameters.map((tab) => ({
              ...tab,
              groups: tab.groups.map((group) => ({
                ...group,
                formData: group.formData.map((formItem) => {
                  const newValue = values[formItem.name];
                  return { ...formItem, value: newValue };
                }),
              })),
            })),
          },
        };
        dispatch(setNodeConfigData(updatedNodeData));
        dispatch(deSyncNode({ id: node.id }));
        notificationHelper.success("Configurations saved");
      })
      .catch((reason) => {
        console.log("validation-error: ", reason);
        notificationHelper.warn("Validation unsuccesful. Please fill all required inputs.");
      });
  };

  const onClosePanelHandler = (event) => {
    event.preventDefault();
    dispatch(toggleNodeConfigurationMenu({ element: nodeConfigurationMenu.element, state: false }));
  };

  return (
    <div>
      <NodeId>{node.id}</NodeId>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
        <GlobalButtonStyled onClick={onClosePanelHandler}>Cancel</GlobalButtonStyled>
        <GlobalButtonStyled type="primary" onClick={onSubmitHandler}>
          Save
        </GlobalButtonStyled>
      </div>

      <ConfigurationTabWrapper>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Values")}
          active={configurationTab === "Values"}
        >
          Values
        </ConfigurationTab>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Events")}
          active={configurationTab === "Events"}
        >
          Events
        </ConfigurationTab>
      </ConfigurationTabWrapper>
      {configurationTab === "Events" ? (
        <div style={{ fontSize: "16px" }}>
          <StatusHandlesForm node={node} dispatcher={nodeConfigDispatch} />

          <TriggerForm node={node} dispatcher={nodeConfigDispatch} />

          <FrozenHandlesForm node={node} dispatcher={nodeConfigDispatch} />

          {/* {(dynamicInput || dynamicOutput) && (
            <HandleCountForm node={node} dispatcher={nodeConfigDispatch} />
          )} */}
        </div>
      ) : (
        <ConfigParametersForm node={node} dispatcher={nodeConfigDispatch} form={form} />
      )}
    </div>
  );
}
