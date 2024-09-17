import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { closeAllNodeGroupMenu } from "store/reducers/flow/flowGuiSlice";
import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import EditNameForm from "./EditNameForm";
import FeatureIcons from "./FeatureIcons";
import NodeMenu from "../NodeMenu/NodeMenu";

const propTypes = {
  self: PropTypes.object.isRequired,
  selectedElements: PropTypes.bool,
};
export default function NodeHeader({ self }) {
  const dispatch = useDispatch();
  const { flowGui, flowElements } = useActiveFlow();
  const { nodeGroupMenuDisplay } = flowGui;
  const [showGroup, setShowGroup] = useState(nodeGroupMenuDisplay);
  const [hover, setHover] = useState(false);
  const [showNodeMenu, setShowNodeMenu] = useState(false);

  const { label, group } = self.data.ui;
  const groupHandle = (e) => {
    setShowGroup(!showGroup);
    dispatch(closeAllNodeGroupMenu(false));
  };
  useEffect(() => {
    if (nodeGroupMenuDisplay) {
      setShowGroup(!nodeGroupMenuDisplay);
    }
  }, [nodeGroupMenuDisplay]);
  const onMouseEnterHandle = () => {
    setHover(true);
  };
  const onMouseLeaveHandle = () => {
    setHover(false);
  };

  const onShowNodeMenuHandle = () => {
    setShowNodeMenu(!showNodeMenu);
  };

  // const NodeIcon = getIconComponent(self.type);
  const [edit, setEdit] = useState(false);
  // const nodeIncomers = () => {
  //   const incomers = getIncomers(self, flowElements.nodes, flowElements.edges);
  //   console.log("incomers: ", incomers);
  // };
  // const nodeOutgoers = () => {
  //   const outgoers = getOutgoers(self, flowElements.nodes, flowElements.edges);
  //   console.log("outgoers: ", outgoers);
  // };
  const sourceEdges = () => {
    const sources = flowElements.edges.filter((edge) => edge.source === self.id);
    console.log("sources: ", sources);
  };
  const targetEdges = () => {
    const targets = flowElements.edges.filter((edge) => edge.target === self.id);
    console.log("targets: ", targets);
  };

  return (
    <Header
      onMouseEnter={onMouseEnterHandle}
      onMouseLeave={onMouseLeaveHandle}
      selected={self.selected}
      nodeType={self.type}
    >
      {/* <button onClick={nodeIncomers}>incomers</button>
        <button onClick={nodeOutgoers}>outgoers</button> */}
      {/* <NodeIcon/> */}
      {/* <button onClick={targetEdges}>TE</button>
      <button onClick={sourceEdges}>SE</button> */}
      <MenuBar nodeType={self.type} selected={self.selected} onClick={onShowNodeMenuHandle}>
        <RxHamburgerMenu></RxHamburgerMenu>
        {showNodeMenu && <NodeMenu self={self}></NodeMenu>}
      </MenuBar>

      <Content>
        {edit ? <EditNameForm setEdit={setEdit} self={self} /> : <Label>{label}</Label>}
      </Content>
      <FeatureIconsWrapper>
        {hover && <FeatureIcons self={self} edit={edit} setEdit={setEdit} />}
      </FeatureIconsWrapper>
    </Header>
  );
}
NodeHeader.propTypes = propTypes;

export const Header = styled.div`
  display: flex;
  min-width: 150px;
  height: 24px;
  // justify-content: space-between;
  align-items: center;
  margin: -2px;

  border-bottom: ${({ nodeType }) =>
    nodeType === "TRIGGER" ? "1px solid #65cd1a" : "1px solid rgba(81, 92, 133, 1)"};

  // border-bottom: 1px solid pink;
  /* border-bottom: ${({ selected }) =>
    selected ? "1px solid #515c84" : "1px solid rgba(81, 92, 133, 1)"}; */
`;
export const MenuBar = styled.div`
  width: 32px;
  height: 100%;
  /* background-color: ${({ selected }) => (selected ? "#A6B3E8" : "rgba(81, 92, 133, 1)")}; */
  background-color: ${({ nodeType }) =>
    nodeType === "TRIGGER" ? "#65cd1a" : "rgba(81, 92, 133, 1)"};
  border-radius: 4px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // color: ${({ selected }) => (selected ? "black" : "#A6B3E8")};
  color: ${({ nodeType }) => (nodeType === "TRIGGER" ? "black" : "#A6B3E8")};
`;
export const Content = styled.div``;

export const Label = styled.div`
  padding-left: 4px;
  font-size: 11px;
  font-weight: 400;
`;
export const FeatureIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  flex: 1;
  padding-right: 8px;
`;
