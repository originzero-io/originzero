import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setGroupSelectedElements, setGroupSingle } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { getSelectedNodes } from "../../../helpers/elementHelper";
import * as Styled from "../GroupBar/GroupBar.style";

const StyledContainer = styled.div`
  position: absolute;
  right: -120px;
  top: -2px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const StyledSearchBar = styled.input`
  border-radius: 4px;
  width: 70%;
  padding-left: 3px;
  background-color: rgb(189, 195, 199);
  border: 1px solid #636e72;
  color: black;
  caret-color: green;
  user-select: none;
  font-size: 10px;
  outline: hidden;
`;
const StyledGroupItem = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
  &:hover {
    background: rgb(15, 175, 143);
  }
`;
const StyledContent = styled.div`
  background: rgb(189, 195, 199);
  margin-top: 2px;
`;
export default function GroupMenu({ self }) {
  const { flowElements, flowGroups } = useActiveFlow();
  const dispatch = useDispatch();

  const [searched, setSearched] = useState([]);
  useEffect(() => {
    setSearched(flowGroups);
  }, [flowGroups]);
  useEffect(() => {
    setSearched(flowGroups);
  }, []);
  const searchHandle = (e) => {
    const { value } = e.target;
    const filtered = flowGroups.filter((group) =>
      group.name.toLowerCase().includes(value.toLowerCase()),
    );
    if (value === "") {
      setSearched([]);
    } else {
      setSearched(filtered);
    }
  };
  const selectGroup = (group) => {
    if (getSelectedNodes(flowElements.nodes).length > 1) {
      dispatch(setGroupSelectedElements(group));
    } else {
      dispatch(setGroupSingle({ self, group }));
    }
  };

  return (
    <StyledContainer>
      <StyledSearchBar
        placeholder="search group"
        className="nodrag nowheel"
        onChange={searchHandle}
      />
      <StyledContent>
        {searched.map((group) => (
          <StyledGroupItem key={group._id} onClick={() => selectGroup(group)}>
            <Styled.Label style={{ fontSize: "12px" }}>{group.name}</Styled.Label>
            <Styled.GroupColor width="15px" height="15px" value={group.color} />
          </StyledGroupItem>
        ))}
      </StyledContent>
    </StyledContainer>
  );
}
