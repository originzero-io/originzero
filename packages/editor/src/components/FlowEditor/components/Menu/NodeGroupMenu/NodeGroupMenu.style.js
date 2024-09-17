import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  border-radius: 6px;
  min-width: 150px;
`;
export const GroupItem = styled.div`
  padding: 2px 6px 2px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: black;
  font-size: 1.4vh;
  margin: 4px;
  border-radius: 4px;
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
`;
export const Input = styled.input``;
export const Button = styled.button`
  border: none;
  background: none;
  padding-left: 1px;
  padding-right: 1px;
  color: #c0392b;
`;
export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 20px;
  height: 20px;
  background: none;
  border: 1px solid blue;
  border-radius: 96px;
  //border: none;
  font-size: 2vh;
`;
