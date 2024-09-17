import styled from "styled-components";
import { Checkbox, Form } from "antd";
import * as Styled from "../NodeConfigMenu.style";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Section = styled.div`
  width: 50%;
`;
const SectionName = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export default function StatusHandlesForm({ node, dispatcher }) {
  const { statusHandles } = node.data;
  const { inputs, outputs } = statusHandles;
  const onChangeNodeInputsHandler = (event) => {
    dispatcher({
      type: "updateInputStatusHandles",
      payload: {
        name: event.target.name,
        value: event.target.checked,
      },
    });
  };
  const onChangeNodeOutputsHandler = (event) => {
    dispatcher({
      type: "updateOutputStatusHandles",
      payload: {
        name: event.target.name,
        value: event.target.checked,
      },
    });
  };
  return (
    <Wrapper>
      <Section>
        <SectionName>Inputs</SectionName>
        <Form style={Styled.FormStyle}>
          {Object.entries(inputs).map((input) => (
            <NodeInput name={input[0]} key={input[0]}>
              <Checkbox name={input[0]} checked={input[1]} onChange={onChangeNodeInputsHandler} />
            </NodeInput>
          ))}
        </Form>
      </Section>
      <Section>
        <SectionName>Outputs</SectionName>
        <Form style={Styled.FormStyle}>
          {outputs && (
            <>
              {outputs &&
                Object.entries(outputs).map((output) => (
                  <NodeInput name={output[0]} key={output[0]}>
                    {/* <input
                      type="checkbox"
                      name={output[0]}
                      checked={output[1]}
                      onChange={onChangeNodeOutputsHandler}
                    /> */}
                    <Checkbox
                      name={output[0]}
                      checked={output[1]}
                      onChange={onChangeNodeOutputsHandler}
                    />
                  </NodeInput>
                ))}
            </>
          )}
        </Form>
      </Section>
    </Wrapper>
  );
}

function NodeInput({ children, name }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <div style={{ color: "whitesmoke" }}>{name}</div>
      {children}
    </div>
  );
}
