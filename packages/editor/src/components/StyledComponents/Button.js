import styled from "styled-components";

const GlobalButtonStyled = styled.div`
  border-radius: 4px;
  background-color: ${({ type }) => (type === "primary" ? "rgba(85, 243, 29, 0.2)" : "#393939")};
  color: ${({ type }) => (type === "primary" ? "#65cd1a" : "#c1c1c1")};
  width: 60px;
  text-align: center;
  font-size: 14px;
  padding: 2px;
  margin: 2px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: ${({ type }) => (type === "primary" ? "rgba(85, 243, 29, 0.4)" : "#4f4f4f")};
  }
`;

export default GlobalButtonStyled;
