import styled from "styled-components";
import { DropdownList } from "./DropdownMenu";

export const Circle = styled.button`
  width: 55px;
  height: 55px;
  background: rgba(29, 185, 84, 0.5);
  border-radius: 50%;
  position: absolute;
  top: -29px;
  border: 7px solid ${(props) => props.theme.paneBackground};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }
  &:focus + ${DropdownList} {
    visibility: visible;
    transform: translateY(0px);
  }
`;
export const Triangle = styled.div`
  margin: 0px 0px;
  border-top-color: ${(props) => props.color || "rgb(80,80,80)"};
  border-right-color: ${(props) => props.color || "rgb(80,80,80)"};
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-style: solid;
  border-width: 10px;
  width: 0px;
  height: 0px;
  border-top-right-radius: 4px;
  align-self: flex-start;
  position: relative;
  cursor: pointer;
`;
export const Flag = styled.div`
  margin: -3px -3px;
  border-color: #20bf55 #20bf55 transparent #20bf55;
  border-style: solid;
  border-width: 8px;
  border-top-right-radius: 4px;
  width: 0px;
  height: 0px;
  -webkit-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -moz-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -ms-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -o-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  filter: drop-shadow(0.9px 1px 1px rgba(0, 0, 0, 0.7));
  box-shadow: inset -22px 115px 72px 12px rgba(255, 3, 255, 1);
`;
