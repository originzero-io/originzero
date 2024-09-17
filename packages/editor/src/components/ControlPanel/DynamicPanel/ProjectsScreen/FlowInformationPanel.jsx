import React from "react";
import useSelectedFlow from "utils/hooks/useSelectedFlow";
import styled from "styled-components";
import { convertDate } from "utils/helpers/date";

const PanelContainer = styled.div`
  padding: 12px;
  position: relative;
  color: #393939;
  height: 100%;
  // background-color: red;
`;
const Header = styled.div`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
`;
const SectionContainer = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const SectionContent = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;
const SectionRow = styled.div`
  padding: 4px;
`;
const InfoKey = styled.span`
  color: #515c85;
  font-weight: 700;
  font-size: 14px;
`;

export default function FlowInformationPanel() {
  const flow = useSelectedFlow();
  return (
    <PanelContainer>
      <SectionContainer>
        <Header>{flow.name} Details</Header>
        <SectionContent>
          <SectionRow>
            <InfoKey>Owner: </InfoKey>
            <span style={{ fontWeight: "600" }}>
              {flow.createdBy.name}{" "}
              <span style={{ color: "#43B104" }}>({flow.createdBy.role})</span>{" "}
            </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>Project: </InfoKey>
            <span style={{ color: "#43B104" }}>{flow.project.name} </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>Workspace: </InfoKey>
            <span style={{ color: "#43B104" }}>{flow.workspace.name} </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>Company: </InfoKey>
            <span>{flow.company} </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>Created: </InfoKey>
            <span>{convertDate(flow.createdAt)} </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>Updated: </InfoKey>
            <span>{convertDate(flow.updatedAt)} </span>
          </SectionRow>
        </SectionContent>
      </SectionContainer>
      <SectionContainer>
        <Header>Status</Header>
        <SectionContent>
          <SectionRow>
            <InfoKey>Port: </InfoKey>
            <span style={{ color: "#43B104" }}>{flow.port} </span>
          </SectionRow>
          <SectionRow>
            <InfoKey>PC: </InfoKey>
            <span style={{ color: "#43B104" }}>Akın-PC </span>
          </SectionRow>
        </SectionContent>
      </SectionContainer>
      <SectionContainer>
        <Header>Description</Header>
        <SectionRow>{flow.description}</SectionRow>
      </SectionContainer>
    </PanelContainer>
  );
}
