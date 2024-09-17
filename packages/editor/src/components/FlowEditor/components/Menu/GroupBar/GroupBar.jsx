import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { useParams } from "react-router-dom";
import GroupBarIcon from "./GroupBarIcon";
import GroupList from "./GroupList";
import NewGroupForm from "./NewGroupForm";

const StyledWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  top: 20%;
  //align-items:center;
  max-height: 70vh;
  right: ${({ visible }) => (visible === "visible" ? "0px" : "-25px")};
`;
const StyledGroupBarWrapper = styled.div`
  width: ${({ visible }) => (visible === "visible" ? "250px" : "0px")};
  max-height: 50vh;
  transition: width 0.3s ease;
  padding: 10px;
  z-index: 5;
  border-bottom-left-radius: 6px;
  background: ${(props) => props.theme.menuBackground};
  overflow-y: auto;
  overflow-x: hidden;
`;
const GroupBar = () => {
  const { flowGui } = useActiveFlow();
  const { groupBarDisplay, theme } = flowGui;
  const { flowId } = useParams();
  return (
    <StyledWrapper visible={groupBarDisplay}>
      <GroupBarIcon flowId={flowId} theme={theme} />
      <StyledGroupBarWrapper visible={groupBarDisplay}>
        <NewGroupForm theme={theme} />
        <GroupList flowId={flowId} theme={theme} />
      </StyledGroupBarWrapper>
    </StyledWrapper>
  );
};

export default React.memo(GroupBar);
