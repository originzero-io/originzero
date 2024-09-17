import styled from "styled-components";
import DynamicPanel, { TopMenu } from "../components/ControlPanel/DynamicPanel";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel.jsx";
import WorkspacePanel from "../components/ControlPanel/WorkspacePanel/WorkspacePanel.jsx";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #2d2d2d;
  // overflow: hidden;
`;
const StyledContent = styled.div`
  display: flex;
  height: 95vh;
`;

export default function ControlPanelPage() {
  return (
    <StyledWrapper>
      <TopMenu />
      <StyledContent>
        <WorkspacePanel />
        <NavigationPanel />
        <DynamicPanel />
      </StyledContent>
    </StyledWrapper>
  );
}
