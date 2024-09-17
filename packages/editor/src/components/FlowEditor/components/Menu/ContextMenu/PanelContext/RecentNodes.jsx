import React, { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import * as Styled from "./PanelContextMenu.style";
import NodeListItem from "./NodeListItem";

export default function RecentNodes({ nodeList, favClick, onDragStart, addNewNode }) {
  const recent = nodeList.filter((node) => node.createdDate !== undefined);
  const [recentNodes, setRecentNodes] = useState([]);
  useEffect(() => {
    const sortByDate = sortBy(recent, "createdDate").reverse().slice(0, 3);
    setRecentNodes(sortByDate);
  }, [nodeList]);
  return (
    <Styled.NodeWrapper>
      {recentNodes.map((node) => (
        <NodeListItem
          key={node.id}
          node={node}
          onDragStart={onDragStart}
          addNewNode={addNewNode}
          favClick={favClick}
        />
      ))}
    </Styled.NodeWrapper>
  );
}
