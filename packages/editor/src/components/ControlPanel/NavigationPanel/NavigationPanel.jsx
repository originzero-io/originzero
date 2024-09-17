import {
  CollapsibleMenu,
  CollapsibleMenuItem,
  CollapsibleTrigger,
} from "components/Shared/Collapsible/CollapsibleMenu";
import { AiOutlineProject } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { MdDevicesOther } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { setModal } from "store/reducers/componentSlice";
import styled from "styled-components";
import useAuthPermission from "utils/hooks/useAuthPermission";
import useProject from "utils/hooks/useProject";
import useWorkspace from "utils/hooks/useWorkspace";
import { convertDate } from "utils/helpers/date";
import AddProjectForm from "./AddProjectForm";
import NavMenuItem from "./NavMenuItem";
import ProjectList from "./ProjectList.jsx";
import WorkspaceBrand from "./WorkspaceBrand";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  // flex-basis: 18%;
  background-color: #2d2d2d;
  position: relative;
  width: ${({ show }) => (show ? "20%" : "0")};
  padding: ${({ show }) => (show ? "15px" : "0")};
  padding-top: 0px;
  overflow-y: auto;
  margin-bottom: 3%;
  transition: width 0.2s ease;
`;
const NavMenu = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  font-size: 26px;
  background: #393939;
  border-top-right-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

const NavigationPanel = () => {
  const dispatch = useDispatch();
  const getPermission = useAuthPermission("project");
  const { url } = useRouteMatch();
  const { activeWorkspace } = useWorkspace();
  const { projects } = useProject();
  const { showNavigationMenu } = useSelector((state) => state.controlPanel);

  // console.log("NAVIGATION_PANEL RENDERED");
  const showModalHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeWorkspace) {
      dispatch(setModal(<AddProjectForm />));
    } else alert("Firstly, create a workspace.");
  };
  const projectItem = () => (
    <CollapsibleTrigger label={`Projects (${projects.length})`} icon={<AiOutlineProject />}>
      {getPermission("CAN_CREATE_PROJECT") && (
        <div onClick={(e) => showModalHandle(e)}>
          <BsPlusCircle style={{ fontSize: "2vmin" }} />
        </div>
      )}
    </CollapsibleTrigger>
  );
  const settingsItem = () => <CollapsibleTrigger label="Settings" icon={<FiSettings />} />;
  return (
    <Container show={showNavigationMenu}>
      <NavMenu show={showNavigationMenu}>
        <WorkspaceBrand workspace={activeWorkspace} />
        <CollapsibleMenu trigger={projectItem()}>
          <Link to={`${url}/projects`}>
            <ProjectList projects={projects} />
          </Link>
        </CollapsibleMenu>
        <Link to={`${url}/team`}>
          <NavMenuItem label="Team" icon={<RiTeamLine />} />
        </Link>
        <Link to={`${url}/notes`}>
          <NavMenuItem label="Notes" icon={<CgNotes />} />
        </Link>
        <Link to={`${url}/devices`}>
          <NavMenuItem label="Devices" icon={<MdDevicesOther />} />
        </Link>
        <Link to={`${url}/settings`}>
          <CollapsibleMenu trigger={settingsItem()}>
            <CollapsibleMenuItem>Account settings</CollapsibleMenuItem>
            <CollapsibleMenuItem>Permission settings</CollapsibleMenuItem>
            <CollapsibleMenuItem>Preferences</CollapsibleMenuItem>
          </CollapsibleMenu>
        </Link>
      </NavMenu>

      <NavMenu style={{ marginTop: "15px" }} show={showNavigationMenu}>
        <DescriptionPanel workspace={activeWorkspace} />
      </NavMenu>
    </Container>
  );
};

export default NavigationPanel;

const DescriptionPanelContainer = styled.div`
  padding: 16px;
  // user-select: contain;
`;
const Title = styled.div`
  color: #c1c1c1;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
`;
const Description = styled.div`
  font-size: 14px;
  color: #fff;
  margin-top: 10px;
`;
const InfoSection = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;
const InfoItem = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const InfoKey = styled.div`
  color: #c1c1c1;
`;
const InfoValue = styled.div`
  color: #a6b3e8;
`;
function DescriptionPanel({ workspace }) {
  if (workspace.name) {
    return (
      <DescriptionPanelContainer>
        <Title>Description</Title>
        <Description>
          This section contains information about the aim of this workspace or relevant output going
          to be achieved. Or to inform newcomers, colleagues that are going to be onboard in the
          workspace
        </Description>
        <InfoSection>
          <InfoItem>
            <InfoKey>Date of Creation: </InfoKey>
            <InfoValue>{convertDate(workspace.createdAt)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoKey>Created By: </InfoKey>
            <InfoValue>{workspace.createdBy.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoKey>Number of Flows </InfoKey>
            <InfoValue>7</InfoValue>
          </InfoItem>
        </InfoSection>
      </DescriptionPanelContainer>
    );
  } else return null;
}
