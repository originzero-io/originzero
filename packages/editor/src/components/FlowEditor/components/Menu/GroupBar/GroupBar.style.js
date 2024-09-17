import styled from "styled-components";

export const Container = styled.div`
  //position: absolute;
  //border-radius: 6px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  //top: 40%;
  //left: -50px;
  //right:0px;
  cursor: pointer;
  z-index: 6;
  user-select: none;
  font-size: 24px;
  padding-right: 4px;
  width: 55px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.menuBackground};
`;

export const GroupItem = styled.div`
  background: none;
  //border: 1px solid rgb(255, 255, 255, 0.1);
  width: 100%;
  padding: 4px 6px 4px 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.iconColor};
  margin: 4px;
  border-radius: 4px;
  user-select: none;
  font-size: 12px;
  &:hover {
    background: ${(props) => props.theme.hoverColor};
  }
`;
export const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 15px;
  height: 15px;
  border-radius: 128px;
`;

export const AddGroupWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 5px 0px 5px;
  margin: 5px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.iconColor};
  width: 100%;
`;
export const Title = styled.div`
  margin-left: 6px;
  user-select: none;
  width: 80%;
`;
export const IconWrapper = styled.div`
  cursor: pointer;
`;
export const Label = styled.div`
  padding-left: 10px;
  width: 70%;
  text-align: start;
  font-size: 16px;
`;
export const Form = styled.form`
  position: relative;
  width: 78%;
`;
export const InputWrapper = styled.div`
  position: relative;
  margin-top: 3px;
`;
export const Input = styled.input`
  border-radius: 4px;
  height: 30px;
  width: 100%;
  padding-left: 30px;
  background-color: transparent;
  border: 1px solid #636e72;
  user-select: none;
  color: ${(props) => props.theme.iconColor};
  font-size: 11px;
  &:focus {
    box-shadow: 0px 0px 44px -4px rgba(0, 0, 0, 0.75);
  }
`;
export const ColorInput = styled.input`
  width: 26px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;
`;
export const ColorFlag = styled.input`
  border: none;
  border-image: none;
  width: 22px;
  height: 26px;
  background: none;
  color: transparent;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 0;
`;
export const GroupColor = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.value};
  border-radius: 2px;
`;
export const Submit = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  border: none;
  background: none;
  padding-left: 1px;
  padding-right: 1px;
  color: #c0392b;
  align-self: flex-end;
`;
export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: gray;
  margin: auto;
  margin-top: 7px;
  opacity: 0.4;
`;
