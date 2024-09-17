import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Panel, PanelGroup } from "react-resizable-panels";
import styled from "styled-components";
import useSelectedFlow from "utils/hooks/useSelectedFlow";
import { selectFlow } from "store/reducers/controlPanelSlice";
import { FlowsByProjectPanel } from "..";
import FlowInformationMenu from "./FlowInformationPanel";
import ResizeHandle from "./ResizeHandle";

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 1%;
  right: 2%;
  color: #2d2d2d;
  font-size: 18px;
  cursor: pointer;
`;
export default function FlowPanel() {
  const flow = useSelectedFlow();
  const dispatch = useDispatch();

  const closePanelHandler = () => {
    dispatch(selectFlow({}));
  };

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={20} minSize={20} l>
        <FlowsByProjectPanel />
      </Panel>
      {flow._id && (
        <>
          <ResizeHandle />
          <Panel
            defaultSize={25}
            minSize={25}
            maxSize={60}
            style={{
              backgroundColor: "#ffffff",
              color: "whitesmoke",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <FlowInformationMenu />
            <CloseButtonWrapper onClick={closePanelHandler}>
              <IoCloseSharp />
            </CloseButtonWrapper>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
