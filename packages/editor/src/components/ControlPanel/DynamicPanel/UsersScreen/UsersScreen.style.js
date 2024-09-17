import styled from "styled-components";

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TBody = styled.tbody`
  &:hover {
    background-color: rgba(46, 213, 115, 0.2);
    transition: background-color 0.2s ease-in-out;
  }
`;
export const Td = styled.td``;
export const TdItem = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
export const Box = styled.div`
  margin-top: 3px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.online ? "#4cd137" : "#95a5a6")};
  border-radius: 50%;
`;
