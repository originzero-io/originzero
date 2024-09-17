import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setElementContextMenu } from "store/reducers/menuSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import * as Styled from "./ElementContextMenu.style";
import { useReactFlow } from "reactflow";

export default function ElementMenu() {
  const { flowElements } = useActiveFlow();
  // const elements = flowElements;
  const { elementMenu } = useSelector((state) => state.menus);
  const dispatch = useDispatch();
  const reactFlowInstance = useReactFlow();

  const deleteItem = () => {
    const { element } = elementMenu;
    reactFlowInstance.deleteElements({ nodes: [element] });
    dispatch(setElementContextMenu(false));
  };
  return (
    <div>
      {elementMenu.state === true && (
        <Styled.Menu x={elementMenu.x} y={elementMenu.y}>
          <Styled.MenuItem>Edit</Styled.MenuItem>
          <Styled.MenuItem onClick={deleteItem}>Delete</Styled.MenuItem>
        </Styled.Menu>
      )}
    </div>
  );
}
