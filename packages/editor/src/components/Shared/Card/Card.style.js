import styled from "styled-components";
import { DropdownList, DropdownWrapper } from "../../StyledComponents/DropdownMenu";

export const CardContainer = styled.div`
  margin: 8px;
  width: 180px;
  height: 110px;
  border-radius: 4px;
  user-select: none;
  background-color: #393939;
  cursor: pointer;
  color: #43b104;
  &:hover {
    border: 2px solid #43b104;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  text-overflow: ellipsis;
`;

export const CardMoreButton = styled.div`
  font-size: 20px;
  position: absolute;
  right: 2px;
  top: -10px;
  color: gray;
  &:hover {
    color: #43b104;
  }
`;
export const DetailMenuList = styled(DropdownList)`
  font-size: 12px;
  width: 80px;
  color: black;
  background: whitesmoke;
  top: 30px;
  left: -10px;
  ${DropdownWrapper}:focus-within & {
    visibility: visible;
  }
  background: #2d2d2d;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #43b104;
  font-size: 16px;
`;
export const DetailMenuText = styled.li`
  margin-left: 5px;
`;
