import React from "react";
import PanelContextMenu from "../Menu/ContextMenu/PanelContext/PanelContextMenu";
import MultiSelectionContextMenu from "../Menu/ContextMenu/MultiselectionContext/MultiSelectionContextMenu";
import ElementContextMenu from "../Menu/ContextMenu/ElementContext/ElementContextMenu";
import GroupBar from "../Menu/GroupBar/GroupBar";
import ControlMenu from "../Menu/NavMenu/ControlMenu";

const FlowEditorMenus = () => (
  <>
    <ControlMenu />
    <MultiSelectionContextMenu />
    {/* <PanelContextMenu /> */}
    {/* <ElementContextMenu /> */}
    {/* <GroupBar /> */}
  </>
);

export default FlowEditorMenus;
