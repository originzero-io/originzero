import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Styled from "./PanelContextMenu.style";
import NodeListItem from "./NodeListItem";

const SearchBar = styled.input`
  border-radius: 4px;
  width: 100%;
  padding-left: 6px;
  opacity: 1;
  background-color: transparent;
  border: 1px solid #636e72;
  color: whitesmoke;
  caret-color: green;
  user-select: none;
`;
export default function AllNodes({ nodeList, favClick, onDragStart, addNewNode }) {
  const [searched, setSearched] = useState(nodeList);
  const searchHandle = (e) => {
    const { value } = e.target;
    const filtered = nodeList.filter((node) =>
      node.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(nodeList);
  }, [nodeList]);

  return (
    <Styled.NodeWrapper>
      <SearchBar placeholder="search" onChange={searchHandle} />
      {searched.map((node) => (
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
