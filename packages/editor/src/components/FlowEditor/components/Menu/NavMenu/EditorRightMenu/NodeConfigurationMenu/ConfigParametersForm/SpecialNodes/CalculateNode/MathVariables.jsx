import React, { useEffect, useState } from "react";
import { BsPlusSquare, BsXCircleFill } from "react-icons/bs";
import notificationHelper from "utils/ui/notificationHelper";
import styled from "styled-components";
import { InputStyled, SectionName } from "../../../NodeConfigMenu.style";

const ContainerStyled = styled.div`
  margin-top: 10px;
`;

const VariableContainerStyled = styled.div`
  margin-bottom: 4px;
`;
const VariableLabelStyled = styled.span`
  margin-right: 20px;
`;

export default function MathVariables({ node, dispatcher }) {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const inputParameterNames = Object.keys(node.data.inputParameters);
    setVariables(inputParameterNames);
  }, [node.data.inputParameters]);

  const addNewVariable = (event) => {
    event.preventDefault();
    const variableName = prompt("Variable name: ");
    const alreadyExist = variables.find((variable) => variable === variableName);

    if (variableName && !alreadyExist) {
      if (variableName.toLowerCase() !== "e") {
        const variablesObj = {};
        [...variables, variableName].forEach((variable) => (variablesObj[variable] = "any"));

        dispatcher({
          type: "addInputParameter",
          payload: variablesObj,
        });
      } else {
        notificationHelper.error("Variable name should not be 'e'. Please give another name.");
      }
    } else if (alreadyExist) {
      notificationHelper.error("A variable with this name already exists. Give another name.");
    } else if (!variableName) {
      notificationHelper.error("Variable name should not be null.");
    }
  };

  const deleteVariable = (variable) => {
    const newVariables = { ...node.data.inputParameters };
    delete newVariables[variable];

    dispatcher({
      type: "deleteInputParameter",
      payload: newVariables,
    });
  };

  return (
    <ContainerStyled>
      <SectionName>Variables </SectionName>
      {variables.map((variable, i) => (
        <VariableContainerStyled key={variable}>
          <VariableLabelStyled>Variable {1 + i}: </VariableLabelStyled>
          <InputStyled style={{ width: "40%", marginRight: "6px" }} value={variable} />
          <BsXCircleFill
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => deleteVariable(variable)}
          />
        </VariableContainerStyled>
      ))}
      <BsPlusSquare
        style={{ color: "white", fontSize: "24px", marginTop: "8px", cursor: "pointer" }}
        onClick={addNewVariable}
      />
    </ContainerStyled>
  );
}
