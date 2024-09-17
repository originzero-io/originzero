import styled from "styled-components";

export const Menu = styled.div`
  background: rgb(189, 195, 199);
  position: absolute;
  top: ${(props) => `${props.y - 25}px`};
  left: ${(props) => `${props.x + 5}px`};
  z-index: 5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;
export const MenuItem = styled.div`
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: transform 0.2s;
  margin: 2px;
  padding: 6px;
  &:hover {
    transform: scale(1.1);
    background: ${(props) => props.theme.hoverColor};
  }
`;
