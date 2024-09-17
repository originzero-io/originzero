/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { CollapsibleMenu, CollapsibleTrigger } from "components/Shared/Collapsible/CollapsibleMenu";
import { setModal } from "store/reducers/componentSlice";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import useProject from "utils/hooks/useProject.js";
import { Alert } from "reactstrap";
import useAuthPermission from "utils/hooks/useAuthPermission";
// import { LuLayoutPanelLeft } from "react-icons/lu";
import * as Styled from "./ProjectsScreen.style";
import AddDashboardFormx from "./forms/AddDashboardForm";
import AddFlowForm from "./forms/AddFlowForm";
import FlowList from "./components/FlowList.jsx";
import { TiFlowSwitch } from "react-icons/ti";
import StarMetalLogo from "assets/images/star-metal-logo.png";

const propTypes = {
  flows: PropTypes.array.isRequired,
};
export default function ProjectsScreen({ flows }) {
  const dispatch = useDispatch();
  const { projects, activeProject } = useProject();
  const getPermission = useAuthPermission("project");
  const flowsCollapseTrigger = () => (
    <CollapsibleTrigger label={`Flows (${flows.length})`} style={{ color: "#288818" }} />
  );
  const dashboardCollapseTrigger = () => (
    <CollapsibleTrigger label="Dashboards" style={{ color: "#288818" }} />
  );
  const [searched, setSearched] = useState(flows);
  const searchHandle = (e) => {
    const { value } = e.target;
    const filtered = flows.filter((flow) => flow.name.toLowerCase().includes(value.toLowerCase()));
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(flows);
  }, [flows]);

  const openStarMetalApp = () => {
    window.open("http://localhost:5174", "_blank");
  };
  return (
    <div style={{ marginRight: "15px", boxShadow: "0px 3px 15px -3px rgba(0,0,0,0.1)" }}>
      {activeProject ? (
        <>
          <Styled.FlowsContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px",
                marginBottom: "12px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <TiFlowSwitch />
                <div style={{ marginLeft: "5px" }}>Flows</div>
              </div>
              {getPermission("CAN_CREATE_FLOW", activeProject._id) && (
                <div onClick={() => dispatch(setModal(<AddFlowForm />))}>
                  <svg
                    style={{ cursor: "pointer" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4 2H9C10.1046 2 11 2.89543 11 4V9C11 10.1046 10.1046 11 9 11H4C2.89543 11 2 10.1046 2 9V4C2 2.89543 2.89543 2 4 2ZM4 13H9C10.1046 13 11 13.8954 11 15V20C11 21.1046 10.1046 22 9 22H4C2.89543 22 2 21.1046 2 20V15C2 13.8954 2.89543 13 4 13ZM18 13H16V16H13V18H16V21H18V18H21V16H18V13ZM4 20V15H9V20H4ZM4 9V4H9V9H4ZM15 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4C13 2.89543 13.8954 2 15 2ZM15 9V4H20V9H15Z"
                      fill="#43B104"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FlowList flows={searched} />
            </div>
          </Styled.FlowsContainer>
          {/* <Styled.FlowsContainer style={{ marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px",
                marginBottom: "12px",
              }}
            >
              <TiFlowSwitch />
              <div style={{ marginLeft: "5px" }}>Applications</div>
            </div>

            <div
              onClick={openStarMetalApp}
              style={{
                border: "1px solid gray",
                width: "150px",
                cursor: "pointer",
              }}
            >
              <img src={StarMetalLogo} width={150} height={100} />
            </div>
          </Styled.FlowsContainer> */}
        </>
      ) : (
        <Alert color="info" style={{ marginLeft: "10px" }}>
          You can start by adding a project to this workspace
        </Alert>
      )}
    </div>
  );
}

ProjectsScreen.propTypes = propTypes;
