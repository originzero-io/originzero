import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { HiCube } from "react-icons/hi";
import { BiInfoCircle, BiCheckCircle } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectElements } from "store/reducers/flow/flowElementsSlice";
import DynamicSVG from "components/Shared/DynamicSVG";

const FlowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #393939;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 0px 5px 0px 10px;
  border-radius: 4px;
`;
const FlowName = styled.div`
  font-size: 20px;
`;
const NodeLength = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40px;
  color: #43b104;
  font-size: 16px;
`;

const NodeList = styled.div`
  margin-left: 17%;
  border-left: 1px solid #393939;
  padding-left: 10px;
  margin-top: 6px;
`;
const NodeItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 2px;
  padding: 2px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(85, 243, 29, 0.2);
    color: #65cd1a;
  }
`;
const NodeFeatureIcons = styled.div`
  color: gray;
  display: flex;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  color: #757575;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #65cd1a;
  }
`;
export default function FlowConfigureMenu() {
  const { flowElements, flowConfig } = useActiveFlow();
  const [clickedNode, setClickedNode] = useState({});
  const dispatch = useDispatch();

  const selectNodeHandler = (node) => {
    dispatch(selectElements([node]));
  };
  return (
    <div>
      <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
        <FlowHeader>
          <FlowName>{flowConfig.name}</FlowName>
          <NodeLength>
            <HiCube />
            <div>{flowElements.nodes.length}</div>
          </NodeLength>
        </FlowHeader>
        <NodeList>
          {flowElements.nodes.map((node) => (
            <NodeItem key={node.id} onClick={() => setClickedNode(node)}>
              <div
                style={{
                  background: "#393939",
                  color: "#65CD1A",
                  fontSize: "20px",
                  display: "flex",
                  padding: "2px",
                }}
              >
                <DynamicSVG svgContent={node.data.ui.icon} color="#65CD1A" size={25} />
              </div>
              <div
                style={{
                  marginLeft: "5px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>{node.data.ui.label}</div>
                <NodeFeatureIcons>
                  <FiMapPin onClick={() => selectNodeHandler(node)} />
                  <BiCheckCircle />
                </NodeFeatureIcons>
              </div>
            </NodeItem>
          ))}
        </NodeList>
      </div>
      {clickedNode.id && <NodeInformationSection clickedNode={clickedNode} />}
    </div>
  );
}

const NodeHeader = styled.div`
  margin-top: 15px;
  background-color: #393939;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
`;
const NodeIconWrapper = styled.div`
  background: #515c85;
  color: #a6b3e8;
  padding: 2px;
  font-size: 22px;
`;
const NodeForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px;
`;
const NodeFormItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NodeFormItemKey = styled.div`
  border-right: 1px solid #393939;
  padding: 10px;
  min-width: 30%;
`;
const NodeFormItemValue = styled.div`
  margin-left: 12px;
  min-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
function NodeInformationSection({ clickedNode }) {
  return (
    <div>
      <NodeHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NodeIconWrapper>
            <DynamicSVG
              svgContent={clickedNode.data.ui.icon}
              color={self.type === "TRIGGER" ? "#65CD1A" : "#A6B3E8"}
              size={25}
            />
          </NodeIconWrapper>
          <div style={{ marginLeft: "5px" }}>{clickedNode.data.ui.label || "NO-CLICKED"}</div>
        </div>
        <BiInfoCircle style={{ fontSize: "22px", marginRight: "5px", cursor: "pointer" }} />
      </NodeHeader>
      <NodeForm>
        <NodeFormItem>
          <NodeFormItemKey>Node</NodeFormItemKey>
          <NodeFormItemValue style={{ color: "#a6b3e8" }}>{clickedNode.id}</NodeFormItemValue>
        </NodeFormItem>
        <NodeFormItem>
          <NodeFormItemKey>Type</NodeFormItemKey>
          <NodeFormItemValue>{clickedNode.type}</NodeFormItemValue>
        </NodeFormItem>
        <NodeFormItem>
          <NodeFormItemKey>Enable</NodeFormItemKey>
          <NodeFormItemValue>{clickedNode.data.enable.toString()}</NodeFormItemValue>
        </NodeFormItem>
        <NodeFormItem>
          <NodeFormItemKey>Position</NodeFormItemKey>
          <NodeFormItemValue>
            {clickedNode.position.x}, {clickedNode.position.y}
          </NodeFormItemValue>
        </NodeFormItem>
      </NodeForm>
    </div>
  );
}
