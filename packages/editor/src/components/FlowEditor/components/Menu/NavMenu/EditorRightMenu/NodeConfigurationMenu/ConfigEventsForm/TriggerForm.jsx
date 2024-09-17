import { Checkbox, Form, Select } from "antd";
import { BsPlusSquare } from "react-icons/bs";
import notificationHelper from "utils/ui/notificationHelper";
import * as Styled from "../NodeConfigMenu.style";

export default function TriggerForm({ node, dispatcher }) {
  return (
    <Form style={Styled.FormStyle}>
      <TriggerInputHandleForm node={node} dispatcher={dispatcher} />
      <TriggerAttributeForm node={node} dispatcher={dispatcher} />
    </Form>
  );
}

function TriggerInputHandleForm({ node, dispatcher }) {
  const { trigHandles } = node.data;

  const onChangeTriggerInputActiveHandler = (event) => {
    dispatcher({
      type: "updateTriggerHandles",
      payload: {
        name: event.target.name,
        value: event.target.checked,
      },
    });
  };

  const addNewTrigHandler = (event) => {
    event.preventDefault();

    const trigName = prompt("Enter trig name: ");
    if (trigName) {
      const currentTrigHandles = Object.keys(trigHandles);

      if (currentTrigHandles.includes(trigName)) {
        notificationHelper.warn("There are already trig in that name.");
      } else {
        dispatcher({ type: "addTriggerHandle", payload: trigName });
      }
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Styled.SectionName>Trigger Handles</Styled.SectionName>
      {trigHandles &&
        Object.entries(trigHandles).map((trigHandle, i) => (
          <div
            style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}
            key={i}
          >
            <div>{trigHandle[0]}</div>
            <Checkbox
              name={trigHandle[0]}
              defaultChecked={trigHandle[1]}
              checked={trigHandle[1]}
              onChange={onChangeTriggerInputActiveHandler}
            />
          </div>
        ))}
      <BsPlusSquare
        style={{ color: "white", fontSize: "24px", marginTop: "8px" }}
        onClick={addNewTrigHandler}
      />
    </div>
  );
}
function TriggerAttributeForm({ node, dispatcher }) {
  const { triggerAttributes } = node.data;

  const onChangeTriggerAttributesHandler = (event) => {
    dispatcher({
      type: "updateTriggerAttributes",
      payload: {
        value: event.target.value,
      },
    });
  };

  const options = [
    {
      value: "restartOperation",
      label: "Restart Operation",
    },
    {
      value: "queue",
      label: "Queue",
    },
    {
      value: "ignore",
      label: "Ignore",
    },
  ];

  return (
    <div>
      <Styled.SectionName>Trigger Attributes</Styled.SectionName>
      {/* <FormGroup>
        <SelectStyled onChange={onChangeTriggerAttributesHandler} value={triggerAttributes}>
          <option>Restart operation</option>
          <option>Queue</option>
          <option>Ignore</option>
        </SelectStyled>
      </FormGroup> */}
      <Select
        className="custom-icon-color"
        style={{ width: "100%" }}
        defaultValue={options.find((option) => option.value === triggerAttributes)}
        options={options}
        onChange={onChangeTriggerAttributesHandler}
      />
    </div>
  );
}
