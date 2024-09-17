import React from "react";
import { Background, MiniMap } from "reactflow";
import PropTypes from "prop-types";
import KeyboardEvents from "./KeyboardEvents";
import FlowEditorMenus from "./FlowEditorMenus";
import UndoRedoButtons from "./UndoRedoButtons";

const propTypes = {
  flowGui: PropTypes.object,
};

const Utils = ({ flowGui }) => (
  <>
    <FlowEditorMenus />
    <Background offset={1} color="#373737" gap={20} />
    <MiniMap
      nodeColor="gray"
      maskColor="rgba(189, 195, 199,0.5)"
      style={{
        visibility: flowGui.miniMapDisplay,
        background: "rgba(53, 59, 72,0.8)",
        borderRadius: "4px",
      }}
    />
    <KeyboardEvents />
    <UndoRedoButtons />
  </>
);

Utils.propTypes = propTypes;

export default React.memo(Utils);
