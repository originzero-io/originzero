import React, { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { getFlowsByWorkspace } from "store/reducers/flow/flowSlice";
import { getNotesByWorkspace } from "store/reducers/noteSlice";
import { getProjectsByWorkspace, setActiveProject } from "store/reducers/projectSlice";
import { getMyWorkspaces, setActiveWorkspace } from "store/reducers/workspaceSlice";
import useAuth from "utils/hooks/useAuth";
import useDidMountEffect from "utils/hooks/useDidMountEffect";
import useWorkspace from "utils/hooks/useWorkspace";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import styled from "styled-components";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSettings,
  IoIosInformationCircle,
} from "react-icons/io";
import { setShowNavigationMenu } from "store/reducers/controlPanelSlice";
import AddWorkspaceForm from "./AddWorkspaceForm";

const WorkspacePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 4%;
  max-width: 4%;
  position: relative;
`;
const Item = styled.div`
  padding: 7px 7px 7px 2px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
`;
const WorkspaceListContainer = styled.div`
  position: relative;
  background: linear-gradient(180deg, #2d2d2d 5.92%, #52bf04);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom-right-radius: 24px;
  height: 65%;
`;
const WorkspaceListItemWrapper = styled(Item)`
  background: ${(props) => (props.active ? "#343a40" : "none")};
  display: flex;
  justify-content: center;
`;
const WorkspaceListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5vmin;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: ${(props) => (props.active ? "#43b104" : "#343A40")};
  padding: 2px;
  text-align: center;
  box-shadow: 2px -1px 42px -15px rgba(168, 168, 168, 1);
`;
const MiddleSection = styled.div`
  background: #52bf04;
  height: 10%;
`;
const BottomSection = styled.div`
  background: linear-gradient(180deg, #52bf04, #3b8e00 86.4%);
  border-top-right-radius: 24px;
  height: 25%;
  position: relative;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  width: 100%;
  height: 32%;
  position: absolute;
  bottom: 20%;
  opacity: 0.7;
  cursor: pointer;
`;
const VisibilityButton = styled.div`
  position: absolute;
  background-color: #2d2d2d;
  bottom: 25%;
  left: 12px;
  width: 100%;
  height: 10%;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #565656;
  font-size: 24px;
  &:hover {
    color: #a0a0a0;
  }
  z-index: 1;
`;

const WorkspacePanel = () => {
  const { workspaces, activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const { showNavigationMenu } = useSelector((state) => state.controlPanel);
  const dispatch = useDispatch();
  // console.log("WORKSPACE_LIST RENDERED");
  useEffect(() => {
    dispatch(getMyWorkspaces());
  }, []);
  useDidMountEffect(() => {
    if (!activeWorkspace && workspaces.length > 0) {
      dispatch(setActiveWorkspace(workspaces[0]));
    }
  }, [workspaces]);
  useDidMountEffect(() => {
    dispatch(getProjectsByWorkspace(activeWorkspace));
    dispatch(getNotesByWorkspace(activeWorkspace));
    dispatch(setActiveProject(""));
    dispatch(getMyPermissionInThisWorkspace({ workspace: activeWorkspace, me: auth }));
  }, [auth, activeWorkspace]);

  const clickWorkspaceHandler = (workspace) => {
    dispatch(setActiveWorkspace(workspace));
  };
  const addWorkspaceHandler = () => {
    dispatch(setModal(<AddWorkspaceForm />));
  };
  const showNavigationMenuHandler = () => {
    dispatch(setShowNavigationMenu(!showNavigationMenu));
  };

  return (
    <WorkspacePanelContainer>
      <WorkspaceListContainer>
        {workspaces.map((workspace) => (
          <WorkspaceListItemWrapper
            key={workspace._id}
            active={workspace._id === activeWorkspace._id}
            onClick={() => clickWorkspaceHandler(workspace)}
          >
            <WorkspaceListItem
              active={workspace._id === activeWorkspace._id}
              data-tip={workspace.name}
              data-for={workspace._id}
            >
              {workspace.name ? workspace.name.split("")[0].toUpperCase() : ""}
            </WorkspaceListItem>
            <Tooltip id={workspace._id} place="top" type="light" />
          </WorkspaceListItemWrapper>
        ))}

        {auth.role === "admin" && (
          <WorkspaceListItemWrapper>
            <WorkspaceListItem onClick={addWorkspaceHandler}>
              <VscAdd style={{ color: "white" }} />
            </WorkspaceListItem>
          </WorkspaceListItemWrapper>
        )}
      </WorkspaceListContainer>
      <MiddleSection></MiddleSection>
      <BottomSection>
        <IconWrapper>
          <IoIosSettings />
          <IoIosInformationCircle />
        </IconWrapper>
      </BottomSection>
      <VisibilityButton onClick={showNavigationMenuHandler}>
        {showNavigationMenu ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </VisibilityButton>
    </WorkspacePanelContainer>
  );
};

export default WorkspacePanel;
