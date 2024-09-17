import React from "react";
import Avatar from "components/Shared/Avatar/Avatar";
import PropTypes from "prop-types";
import useWorkspace from "utils/hooks/useWorkspace";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledTitle = styled.div`
  margin-top: 5px;
  font-size: 2vmin;
`;

const propTypes = {
  member: PropTypes.object.isRequired,
};
export default function UserHeader({ member }) {
  const { activeWorkspace } = useWorkspace();
  return (
    <StyledContainer>
      <Avatar avatar={member.avatar} size={60} />
      <StyledTitle>
        {member.username}
        's Permissions of
        {activeWorkspace.name}
      </StyledTitle>
    </StyledContainer>
  );
}

UserHeader.propTypes = propTypes;
