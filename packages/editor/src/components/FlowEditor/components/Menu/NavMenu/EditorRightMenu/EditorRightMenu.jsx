import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LuSettings2 } from "react-icons/lu";
import { PiTreeStructure } from "react-icons/pi";
import { useState } from "react";
import NodeConfigurationMenu from "./NodeConfigurationMenu/NodeConfigurationMenu";
import FlowInformationMenu from "./FlowInformationMenu/FlowInformationMenu";

const EditorRightMenuWrapper = styled.div`
  padding: 12px;
  position: relative;
  color: #e7e5e5;
  height: 100%;
`;
const TabName = styled.div`
  position: absolute;
  top: 2vh;
  border: 1px solid #c1c1c1;
  color: #c1c1c1;
  padding: 4px 20px 4px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;
`;

const TabLibraryStyle = createGlobalStyle`
  .e-right-menu-tab{
    height: 100%;
    font-size: 2vmin;
  }
  .e-right-menu-tab--selected {
      background: #c1c1c1;
      color: #2d2d2d;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      user-select: none;  
  }
  .e-right-menu-tab--selected:focus:after{
    background: none;
  }
  .e-right-menu-tab-list{
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid rgb(157, 157, 157);
  }
`;
const AntDesignLibraryStyle = createGlobalStyle`
  .custom-icon-color .anticon {
    color: #43b104; /* Özel ikon rengi */
  }
`;

export default function EditorRightMenu() {
  const { nodeConfigurationMenu } = useSelector((state) => state.menus);
  const [tabName, setTabName] = useState("Node Configuration");

  return (
    <EditorRightMenuWrapper>
      <AntDesignLibraryStyle />
      <TabLibraryStyle />
      <TabName>{tabName}</TabName>
      <Tabs
        defaultIndex={0}
        className="e-right-menu-tab"
        selectedTabClassName="e-right-menu-tab--selected"
      >
        <TabList className="e-right-menu-tab-list">
          <Tab onClick={() => setTabName("Node Configuration")}>
            <LuSettings2 />
          </Tab>
          <Tab onClick={() => setTabName("Flow")}>
            <PiTreeStructure />
          </Tab>
        </TabList>

        <TabPanel>
          {Object.hasOwn(nodeConfigurationMenu.element, "id") ? (
            <NodeConfigurationMenu />
          ) : (
            <div>Select any node</div>
          )}
        </TabPanel>
        <TabPanel>
          <FlowInformationMenu />
        </TabPanel>
      </Tabs>
    </EditorRightMenuWrapper>
  );
}
