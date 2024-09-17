/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import styled from "styled-components";
import FlowEnvVariablesMenu from "./FlowEnvVariablesMenu";
import FlowConnectionMenu from "./FlowConnectionMenu";
import FlowConfigureMenu from "./FlowConfigureMenu";

const FlowInformationTabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  margin-bottom: 20px;
`;
const FlowInformationTab = styled.div`
  &:hover {
    border-bottom: 1px solid gray;
  }
  border-bottom: ${({ active }) => active && "1px solid #c1c1c1"};
`;
function FlowInformationMenu() {
  const [informationTab, setInformationTab] = useState("Configure");
  const sections = ["Env. Variables", "Connection", "Configure"];

  return (
    <div>
      <FlowInformationTabWrapper>
        {sections.map((section) => (
          <FlowInformationTab
            key={section}
            onClick={() => setInformationTab(section)}
            active={informationTab === section}
          >
            {section}
          </FlowInformationTab>
        ))}
      </FlowInformationTabWrapper>
      {informationTab === "Env. Variables" ? (
        <FlowEnvVariablesMenu />
      ) : informationTab === "Connection" ? (
        <FlowConnectionMenu />
      ) : informationTab === "Configure" ? (
        <FlowConfigureMenu />
      ) : (
        <></>
      )}
    </div>
  );
}

export default FlowInformationMenu;
