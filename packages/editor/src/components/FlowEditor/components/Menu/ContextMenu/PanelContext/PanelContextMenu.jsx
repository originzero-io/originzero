/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import themeColor from "components/Shared/ThemeReference";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { addNodeToFavorites } from "store/reducers/panelNodeListSlice";
import { addNewNode } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { useReactFlow } from "reactflow";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import RecentNodes from "./RecentNodes";
import { createNode } from "../../../../helpers/elementHelper";
import * as Styled from "./PanelContextMenu.style";

const PanelContextMenu = () => {
  const { panelMenu } = useSelector((state) => state.menus);
  const { flowGui } = useActiveFlow();
  const { theme } = flowGui;
  const nodeList = useSelector((state) => state.panelNodeList);
  const dispatch = useDispatch();

  const reactFlowInstance = useReactFlow();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const favClick = (node) => {
    dispatch(addNodeToFavorites(node));
  };
  const addNewNodeHandle = (node) => {
    const position = reactFlowInstance.project({
      x: panelMenu.x - 200,
      y: panelMenu.y,
    });
    const newNode = createNode(node.type, position);
    dispatch(addNewNode(newNode));
  };
  return (
    <>
      {panelMenu.state && (
        <Styled.Container x={panelMenu.x} y={panelMenu.y}>
          <Tabs
            selectedTabClassName="selected-tab"
            style={{
              color: themeColor[theme].iconColor,
            }}
          >
            <TabList style={{ position: "sticky", top: "0", zIndex: "6" }}>
              <Tab>All</Tab>
              <Tab>Favorites</Tab>
              <Tab>Recent</Tab>
            </TabList>
            <TabPanel>
              <AllNodes
                nodeList={nodeList}
                favClick={favClick}
                onDragStart={onDragStart}
                addNewNode={addNewNodeHandle}
              />
            </TabPanel>
            <TabPanel>
              <FavoriteNodes
                nodeList={nodeList}
                favClick={favClick}
                onDragStart={onDragStart}
                addNewNode={addNewNodeHandle}
              />
            </TabPanel>
            <TabPanel>
              <RecentNodes
                nodeList={nodeList}
                favClick={favClick}
                onDragStart={onDragStart}
                addNewNode={addNewNodeHandle}
              />
            </TabPanel>
          </Tabs>
        </Styled.Container>
      )}
    </>
  );
};

export default PanelContextMenu;
