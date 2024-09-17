/* eslint-disable arrow-body-style */
import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import FlowEditor from "components/FlowEditor/FlowEditor";
import useActiveFlow from "utils/hooks/useActiveFlow";
import theme from "components/Shared/ThemeReference";
import { resetActiveFlowConfig } from "store/reducers/flow/flowConfigSlice";
import { resetActiveFlowGui } from "store/reducers/flow/flowGuiSlice";
import {
  resetActiveFlowElements,
  setActiveFlowElements,
  showRunningNode,
} from "store/reducers/flow/flowElementsSlice";
import { setSystemNodes } from "store/reducers/systemNodeSlice";
import EditorTopLeftMenu from "components/FlowEditor/components/Menu/NavMenu/EditorTopMenu/EditorTopLeftMenu";
import EditorTopRightMenu from "components/FlowEditor/components/Menu/NavMenu/EditorTopMenu/EditorTopRightMenu";
import EditorLeftMenu from "components/FlowEditor/components/Menu/NavMenu/EditorLeftMenu/EditorLeftMenu";
import EditorRightMenu from "components/FlowEditor/components/Menu/NavMenu/EditorRightMenu/EditorRightMenu";
import { PanelGroup, Panel } from "react-resizable-panels";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { toggleNodeConfigurationMenu } from "store/reducers/menuSlice";
import { useFlowExecutorSocket } from "context/FlowExecutorSocketProvider";
import notificationHelper from "utils/ui/notificationHelper";
import { beginTheBar } from "store/reducers/componentSlice";
import { useFlowContext } from "context/FlowDataProvider";
import { IoAlertOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import ResizeHandle from "../components/FlowEditor/components/Menu/NavMenu/EditorRightMenu/ResizeHandle";

const StyledFlowWrapper = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
const FlowTopMenuWrapper = styled.div`
  height: 5%;
  width: 100%;
  background: #2d2d2d;
  color: #c1c1c1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #262626;
`;
const FlowNameWrapper = styled.div`
  font-size: 2.5vmin;
  margin-left: 120px;
  display: flex;
  align-items: center;
`;

const ShowRightMenuButton = styled.div`
  color: #757575;
  font-size: 2.5vmin;
  position: absolute;
  top: 40%;
  right: 0;
`;

const SyncStatusWrapper = styled.div`
  background: ${({ sync }) => (sync ? "green" : "#f51c1c")};
  background: ${({ sync }) => (sync ? "#43b104" : "rgb(0,188,255)")};
  border-radius: 50%;
  // border: 1px solid gray;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: rgba(53, 59, 72, 0.8);
  color: ${({ sync }) => (sync ? "#2d2d2d" : "#2d2d2d")};
  opacity: 0.8;
  font-size: 18px;
`;

const FlowName = styled.div`
  font-style: ${({ sync }) => (sync ? "normal" : "italic")};
`;

const propTypes = {
  match: PropTypes.object,
};

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowGui, flowConfig } = useActiveFlow();
  const rfWrapper = useRef(null);
  const [showLeftMenu, setShowLeftMenu] = useState(true);
  const { flowExecutorSocket, flowExecutorEvent } = useFlowExecutorSocket();
  const { syncedFlow } = useFlowContext();

  useEffect(() => {
    dispatch(beginTheBar());
    flowExecutorEvent.onFlowError((data) => {
      notificationHelper.error(data);
    });

    flowExecutorEvent.onFlowNotification((data) => {
      notificationHelper.success(data);
    });

    flowExecutorEvent.onExecuteFlow((data) => {
      notificationHelper.success(data);
    });

    flowExecutorEvent.onNodeRunningStatus((data) => {
      dispatch(showRunningNode(data));
    });
    return () => {
      flowExecutorSocket.disconnect(); // close connection when page changes
      dispatch(resetActiveFlowConfig());
      dispatch(resetActiveFlowGui());
      dispatch(resetActiveFlowElements());
    };
  }, []);

  const showLeftMenuHandler = () => {
    setShowLeftMenu(!showLeftMenu);
  };

  const { nodeConfigurationMenu } = useSelector((state) => state.menus);

  const toggleRightMenu = () => {
    if (nodeConfigurationMenu.state === true) {
      dispatch(
        toggleNodeConfigurationMenu({ element: nodeConfigurationMenu.element, state: false }),
      );
    } else {
      dispatch(
        toggleNodeConfigurationMenu({ element: nodeConfigurationMenu.element, state: true }),
      );
    }
  };

  return (
    <ReactFlowProvider>
      <ThemeProvider theme={theme[flowGui.theme]}>
        <FlowTopMenuWrapper>
          <EditorTopLeftMenu />
          <FlowNameWrapper>
            <SyncStatusWrapper sync={syncedFlow}>
              {syncedFlow ? <TiTick /> : <IoAlertOutline />}
            </SyncStatusWrapper>
            <FlowName sync={syncedFlow}>
              {flowConfig.name || "NO - DATA"}
              {!syncedFlow && "*"}
            </FlowName>
          </FlowNameWrapper>
          <EditorTopRightMenu />
        </FlowTopMenuWrapper>

        <StyledFlowWrapper ref={rfWrapper}>
          <EditorLeftMenu showMenu={showLeftMenu} setShowMenu={showLeftMenuHandler} />
          <PanelGroup direction="horizontal">
            <Panel
              defaultSize={20}
              minSize={20}
              style={{
                backgroundColor: "#2d2d2d",
                color: "whitesmoke",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <FlowEditor reactFlowWrapper={rfWrapper} />
              <ShowRightMenuButton onClick={toggleRightMenu}>
                {nodeConfigurationMenu.state ? <GoTriangleRight /> : <GoTriangleLeft />}
              </ShowRightMenuButton>
            </Panel>

            <ResizeHandle />

            {nodeConfigurationMenu.state && (
              <Panel
                defaultSize={40}
                minSize={40}
                style={{
                  backgroundColor: "#2d2d2d",
                  color: "whitesmoke",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                <EditorRightMenu />
              </Panel>
            )}
          </PanelGroup>
        </StyledFlowWrapper>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

FlowPage.propTypes = propTypes;

export default React.memo(FlowPage);
