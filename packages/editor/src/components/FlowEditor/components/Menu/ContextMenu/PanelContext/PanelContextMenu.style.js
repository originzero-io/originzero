import styled from "styled-components";

export const Container = styled.div`
  padding: 5px 5px 5px 5px;
  background: ${(props) => props.theme.menuBackground};
  position: absolute;
  top: ${(props) => `${props.y - 25}px`};
  left: ${(props) => `${props.x + 5}px`};
  z-index: 5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow-y: auto;
`;
export const NodeWrapper = styled.div`
  border-radius: 2px;
  color: rgb(200, 200, 200);
  transition: all 0.1s ease;
  position: relative;
  padding: 6px;
`;

export const NodeElement = styled.div`
  background: rgb(85, 85, 85);
  margin: 5px 2px 5px 2px;
  &:hover {
    transform: scale(1.1);
  }
  padding: 6px 6px;
  font-size: 14px;
  border-radius: 4px;
  min-width: 210px;
  background-color: #000000;
  background-image: linear-gradient(355deg, #323232 0%, #505050 80%);
  box-shadow: 0.261px 1.5px 3px 0px rgba(0, 0, 0, 0.996);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
`;
export const Label = styled.div`
  color: rgb(220, 220, 220);
  padding-left: 10px;
  font-family: "Prime-Light";
`;
export const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;
