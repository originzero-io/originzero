import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./PanelContextMenu.style";
import FavIconManager from "./FavIconManager";

const propTypes = {
  node: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  addNewNode: PropTypes.func.isRequired,
  favClick: PropTypes.func.isRequired,
};
export default function NodeListItem({ node, onDragStart, addNewNode, favClick }) {
  return (
    <Styled.NodeElement
      onDragStart={(event) => onDragStart(event, node.name)}
      onDoubleClick={() => addNewNode(node)}
      draggable
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {node.icon}
        <Styled.Label>{node.name}</Styled.Label>
      </div>
      <Styled.IconWrapper>
        <div onClick={() => addNewNode(node)}>
          <i className="fas fa-plus" style={{ width: "15px", height: "15px" }} />
        </div>
        <FavIconManager node={node} favClick={favClick} />
      </Styled.IconWrapper>
    </Styled.NodeElement>
  );
}

NodeListItem.propTypes = propTypes;
