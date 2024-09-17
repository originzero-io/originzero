import React from "react";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { FiMove } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { MdSettings } from "react-icons/md";
import { useReactFlow } from "reactflow";
import { useDispatch } from "react-redux";
import { toggleNodeConfigurationMenu } from "store/reducers/menuSlice";

const NodeMenuWrapper = styled.div`
  position: absolute;
  top: -40px;
  left: 2px;
  background: #2d2d2d;
  display: flex;
  justify-content: space-evenly;
  border-radius: 4px;
  width: 60%;
  padding: 2px;
  color: ${(props) => (props.nodeType === "TRIGGER" ? "#65cd1a" : "#A6B3E8")};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  font-size: 16px;
`;
const NodeMenuList = styled.div`
  background: #393939;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DiamondBottom = styled.div`
  position: absolute;
  bottom: -10px;
  left: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #2d2d2d;
`;
export default function NodeMenu({ self }) {
  const reactFlowInstance = useReactFlow();
  const dispatch = useDispatch();

  const deleteItem = () => {
    if (confirm("Sure?")) {
      reactFlowInstance.deleteElements({ nodes: [self] });
    }
  };
  const openConfigurationMenu = () => {
    dispatch(toggleNodeConfigurationMenu({ element: self, state: true }));
  };
  return (
    <NodeMenuWrapper nodeType={self.type}>
      <NodeMenuList onClick={openConfigurationMenu}>
        <MdSettings />
      </NodeMenuList>
      <NodeMenuList>
        <BiSolidEdit />
      </NodeMenuList>
      <NodeMenuList>
        <FiMove />
      </NodeMenuList>
      <NodeMenuList onClick={deleteItem}>
        <AiOutlineDelete />
      </NodeMenuList>
      <DiamondBottom />
    </NodeMenuWrapper>
  );
}
