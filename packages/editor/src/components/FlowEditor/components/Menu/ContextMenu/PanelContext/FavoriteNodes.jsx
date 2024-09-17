import React from "react";
import * as Styled from "./PanelContextMenu.style";
import NodeListItem from "./NodeListItem";

export default function FavoriteNodes({ nodeList, favClick, onDragStart, addNewNode }) {
  const favoriteNodes = nodeList.filter((node) => node.fav === true);
  return (
    <Styled.NodeWrapper>
      {favoriteNodes.length > 0
        ? favoriteNodes.map((node) => (
            <NodeListItem
              key={node.id}
              node={node}
              onDragStart={onDragStart}
              addNewNode={addNewNode}
              favClick={favClick}
            />
          ))
        : "Click the star button to fav nodes"}
    </Styled.NodeWrapper>
  );
}
