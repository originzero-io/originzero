import { Badge, Form } from "antd";
import { CiLock, CiUnlock } from "react-icons/ci";
import styled from "styled-components";
import * as Styled from "../NodeConfigMenu.style";

const LockWrapper = styled.div`
  color: ${({ checked }) => (checked ? "#43B104" : "#757575")};
  font-size: 26px;
  display: flex;
`;
export default function FrozenHandlesForm({ node, dispatcher }) {
  const { frozenHandles, outputValues } = node.data;

  const onCheckFrozenHandleHandler = (handleName, checked) => {
    if (!checked) {
      dispatcher({ type: "freezeHandle", payload: handleName });
    } else {
      dispatcher({ type: "unFreezeHandle", payload: handleName });
    }
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Frozen Handles</Styled.SectionName>
      {outputValues &&
        Object.entries(outputValues).map((output) => (
          <div
            key={output}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>{output[0]}</div>
              <Badge style={{ marginLeft: "10px" }} count={output[1]} color="cyan" />
            </div>
            <LockWrapper
              checked={frozenHandles.includes(output[0])}
              onClick={() =>
                onCheckFrozenHandleHandler(output[0], frozenHandles.includes(output[0]))
              }
            >
              {frozenHandles.includes(output[0]) ? <CiLock /> : <CiUnlock />}
            </LockWrapper>
          </div>
        ))}
    </Form>
  );
}
