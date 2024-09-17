import { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import NotFound from "./NotFound";
import FlowPanel from "./ProjectsScreen/FlowPanel";
import {
  DevicesScreen,
  LearnScreen,
  NotesScreen,
  PermissionScreen,
  SettingsScreen,
  TeamScreen,
  UsersScreen,
} from "./index";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow-y: auto;
  overflow-x: hidden;
  border-top-left-radius: 10px;
  z-index: 2;
`;
const StyledPanelComponentWrapper = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-left: 15px;
`;
export default function DynamicPanel() {
  const route = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    history.push("/panel/projects");
  }, []);

  return (
    <StyledContainer>
      <StyledPanelComponentWrapper>
        <Switch>
          <Route exact path={`${route.url}/projects`} component={FlowPanel} />
          <Route exact path={`${route.url}/team`} component={TeamScreen} />
          <Route exact path={`${route.url}/permissions/:member_id`} component={PermissionScreen} />
          <Route exact path={`${route.url}/learn`} component={LearnScreen} />
          <Route exact path={`${route.url}/notes`} component={NotesScreen} />
          <Route exact path={`${route.url}/devices`} component={DevicesScreen} />
          <Route exact path={`${route.url}/settings`} component={SettingsScreen} />
          <Route exact path={`${route.url}/users`} component={UsersScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </StyledPanelComponentWrapper>
    </StyledContainer>
  );
}
