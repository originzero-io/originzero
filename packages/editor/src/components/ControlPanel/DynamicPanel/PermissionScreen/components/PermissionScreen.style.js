import styled from "styled-components";

const Index = styled.div`
  user-select: none;
`;
export const UserHeader = styled(Index)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AllPermissionsContainer = styled(Index)`
  width: 19%;
  margin-bottom: 10px;
`;
export const TabContainer = styled(Index)`
  height: 90%;
  display: flex;
`;
export const PermissionContainer = styled(Index)`
  border: 1px outset #343a40;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: ${(props) => props.size};
  transition: background 0.2s ease;
  &:hover {
    background: #212529;
    border: 1px dotted rgba(113, 128, 147, 0.8);
  }
  //border-top-left-radius:10px;
  //border-top-right-radius:10px;
`;
export const PermissionHeader = styled(Index)`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4vmin;
  background: #343a40;
  min-height: 10%;
  ${PermissionContainer}:hover & {
    background: #3e464d;
  }
`;
export const PermissionContent = styled(Index)`
  flex: 80%;
  padding: 2px;
  //background:gray;
`;
