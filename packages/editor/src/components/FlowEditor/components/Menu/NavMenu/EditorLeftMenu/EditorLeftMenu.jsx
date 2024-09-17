import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import DynamicSVG from "components/Shared/DynamicSVG";
import { createPanelNodeList } from "components/FlowEditor/helpers/nodeObjectHelper";
import SearchBar from "components/Shared/SearchBar/SearchBar";

const Wrapper = styled.div`
  position: relative;
  min-width: ${({ showMenu }) => (showMenu ? "270px" : "0")};
  max-width: ${({ showMenu }) => (showMenu ? "270px" : "0")};
  background-color: #2d2d2d;
  transition: all 0.2s ease;
  border-right: 0.5px solid black;
`;
const EditorLeftMenuWrapper = styled.div`
  display: ${({ showMenu }) => (showMenu ? "flex" : "none")};

  flex-direction: column;
`;
const EditorMenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 6px;
  padding-top: 10px;
`;
const ShowMenuButton = styled.div`
  color: #757575;
  font-size: 2.5vmin;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 40%;
  right: -10px;
  z-index: 1000;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin: 2px;
`;
const CategoryName = styled.div`
  color: #c1c1c1;
  margin-bottom: 5px;
  border-bottom: 1px solid #262626;
`;

const NodeItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function EditorLeftMenu({ showMenu, setShowMenu }) {
  const nodeList = useSelector((state) => state.systemNodes);

  const [filteredCategories, setFilteredCategories] = useState({});
  const [categories, setCategories] = useState({});
  const searchHandle = (e) => {
    const { value } = e.target;

    const filteredObject = {};

    for (const category in categories) {
      const categoryItems = categories[category].filter((item) =>
        item.type.toLowerCase().includes(value.toLowerCase()),
      );

      if (categoryItems.length > 0) {
        filteredObject[category] = categoryItems;
      }
    }

    setFilteredCategories(filteredObject);
  };

  useEffect(() => {
    const groupedCategories = {};

    const nodes = createPanelNodeList(nodeList);

    nodes.forEach((node) => {
      const { category } = node;

      if (!groupedCategories[category]) {
        groupedCategories[category] = [];
      }

      groupedCategories[category].push(node);
    });

    setCategories(groupedCategories);
    setFilteredCategories(groupedCategories);
  }, [nodeList]);

  return (
    <Wrapper showMenu={showMenu}>
      <ShowMenuButton showMenu={showMenu} onClick={setShowMenu}>
        {showMenu ? <GoTriangleLeft /> : <GoTriangleRight />}
      </ShowMenuButton>
      <EditorLeftMenuWrapper showMenu={showMenu}>
        <SearchBar placeholder="Filter Nodes" onChange={searchHandle} />

        <EditorMenuItemWrapper>
          {Object.keys(filteredCategories).map((category) => (
            <CategoryWrapper key={category}>
              <CategoryName>{category}</CategoryName>
              <NodeItemWrapper>
                {filteredCategories[category].map((node) => (
                  <LeftMenuItem key={node.id} node={node} />
                ))}
              </NodeItemWrapper>
            </CategoryWrapper>
          ))}
        </EditorMenuItemWrapper>
      </EditorLeftMenuWrapper>
    </Wrapper>
  );
}

const StyledMenuItem = styled.div`
  width: 75px;
  height: 76px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  background: #262626;
  border-radius: 4px;
  border: ${({ nodeType }) =>
    nodeType === "TRIGGER" ? "1px #43b104 solid;" : "1px #515C85 solid"};
  color: ${({ nodeType }) => (nodeType === "TRIGGER" ? "#65CD1A" : "#A6B3E8")};
  margin: 4px;
  // font-size: 12.1px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #333333;
  }
`;
const NodeLabel = styled.div`
  margin-top: 7px;
  font-size: 9px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
function LeftMenuItem({ node }) {
  const nodeSvg = node.icon;
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      <StyledMenuItem
        nodeType={node.type}
        onDragStart={(event) => onDragStart(event, node.type)}
        draggable
        data-tip={node.label}
        data-for={`pnl-${node.id}`}
      >
        <div>
          <DynamicSVG
            svgContent={nodeSvg}
            color={node.type === "TRIGGER" ? "#65CD1A" : "#A6B3E8"}
            size={34}
          />
        </div>
        <NodeLabel>{node.type}</NodeLabel>
      </StyledMenuItem>
      <Tooltip id={`pnl-${node.id}`} place="top" type="light" />
    </>
  );
}
