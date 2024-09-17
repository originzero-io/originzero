/* eslint-disable no-nested-ternary */
import { Col, Form, FormGroup, Label } from "reactstrap";
import * as Styled from "../NodeConfigMenu.style";
import CalculateNodeConfigParameters from "./SpecialNodes/CalculateNode/CalculateNodeConfigParameters";
import ConditionNodeConfigParameters from "./SpecialNodes/ConditionNode/ConditionNodeConfigParameters";

export default function ConfigParametersForm({ node, dispatcher, form }) {
  const { configParameters } = node.data;
  const parameterEntries = Object.entries(configParameters);

  const onChangeConfigParametersHandler = (event, inputType) => {
    const value = inputType === "number" ? parseInt(event.target.value, 10) : event.target.value;
    dispatcher({
      type: "updateConfigParameters",
      payload: { name: event.target.name, value: value },
    });
  };

  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Parameters:</Styled.SectionName>
      {parameterEntries.map((entry, index) => (
        <FormGroup row key={index}>
          <Label sm={4}>{entry[0]}</Label>
          <Col sm={8}>
            <Styled.InputWrapper>
              {node.type === "CALCULATE" && entry[0] === "formula" ? (
                <CalculateNodeConfigParameters node={node} dispatcher={dispatcher} form={form} />
              ) : node.type === "CONDITION" ? (
                <ConditionNodeConfigParameters node={node} dispatcher={dispatcher} form={form} />
              ) : (
                <Styled.InputStyled
                  id={entry[0]}
                  name={entry[0]}
                  type={typeof entry[1]}
                  value={entry[1]}
                  onChange={(event) => onChangeConfigParametersHandler(event, typeof entry[1])}
                />
              )}
            </Styled.InputWrapper>
            {/* <Styled.InputWrapper>
              {node.type === "CALCULATE" && entry[0] === "formula" ? (
                <CalculateNodeConfigParameters node={node} dispatcher={dispatcher} />
              ) : (
                <Styled.InputStyled
                  id={entry[0]}
                  name={entry[0]}
                  type={typeof entry[1]}
                  value={entry[1]}
                  onChange={(event) => onChangeConfigParametersHandler(event, typeof entry[1])}
                />
              )}
            </Styled.InputWrapper> */}
          </Col>
        </FormGroup>
      ))}
    </Form>
  );
}
