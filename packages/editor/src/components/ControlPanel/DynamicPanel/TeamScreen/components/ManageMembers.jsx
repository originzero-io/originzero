import React, { useState } from "react";
import useUser from "utils/hooks/useUser";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import useWorkspace from "utils/hooks/useWorkspace";
import Avatar from "components/Shared/Avatar/Avatar";
import { useDispatch } from "react-redux";
import { addUserToWorkspace, removeUserToWorkspace } from "store/reducers/userSlice";

const StyledUserItem = styled.div`
  margin-left: 10px;
`;
const StyledContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export default function ManageMembers() {
  const dispatch = useDispatch();
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const addMemberHandle = (user) => {
    dispatch(addUserToWorkspace({ userInfo: user, workspace: activeWorkspace }));
  };
  const removeMemberHandle = (user) => {
    dispatch(removeUserToWorkspace({ userInfo: user, workspace: activeWorkspace }));
  };
  return (
    <div>
      {users.map((user) => (
        <StyledContainer key={user._id}>
          <Avatar avatar={user.avatar} />
          <StyledUserItem>{user.username}</StyledUserItem>
          {user.workspaces.some((workspace) => workspace === activeWorkspace._id) ? (
            <TiTickOutline style={{ fontSize: "30px" }} onClick={() => removeMemberHandle(user)} />
          ) : (
            <BsPlusCircle style={{ fontSize: "24px" }} onClick={() => addMemberHandle(user)} />
          )}
        </StyledContainer>
      ))}
    </div>
  );
}
