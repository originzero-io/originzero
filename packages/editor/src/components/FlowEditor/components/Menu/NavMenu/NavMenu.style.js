import styled from "styled-components";

export const MenuIndex = styled.div`
  position: absolute;
  min-width: 250px;
  z-index: 6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 4px;
`;
export const Menu = styled.div`
  // background: ${(props) => props.theme.menuBackground};
  width: 21%;
  z-index: 6;
  background: red;
  display: flex;
  flex-direction: row;
  // justify-content: flex-end;
  align-items: center;
`;
export const MenuItem = styled.button`
  background: none;
  border: none;
  user-select: none;
  padding: 5px;
  color: #c1c1c1;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.1);
  } */
`;
