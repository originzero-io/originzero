/* eslint-disable no-nested-ternary */
import { Form, Input } from "antd";
import * as Styled from "../NodeConfigMenu.style";

export default function DynamicHandlesForm({ node, dispatcher }) {
  const { targetCount, sourceCount, dynamicInput, dynamicOutput } = node.data.ioEngine;
  const handleCountChange = (event) => {
    dispatcher({
      type: "updateHandleCount",
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Value Handle Count:</Styled.SectionName>
      {dynamicInput && dynamicOutput ? (
        <>
          <div>Target Length</div>
          <Input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={targetCount}
            onChange={handleCountChange}
          />
          <div>Source Length</div>
          <Input
            type="number"
            name="sourceCount"
            min={1}
            className="nodrag nowheel"
            value={sourceCount}
            onChange={handleCountChange}
          />
        </>
      ) : dynamicInput ? (
        <>
          <div>Target Length</div>
          <Input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={targetCount}
            onChange={handleCountChange}
          />
        </>
      ) : (
        dynamicOutput && (
          <>
            <div>Source Length</div>
            <Input
              type="number"
              name="sourceCount"
              min={1}
              className="nodrag nowheel"
              value={sourceCount}
              onChange={handleCountChange}
            />
          </>
        )
      )}
    </Form>
  );
}
