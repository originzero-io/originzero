import styled from "styled-components";

export const Input = styled.input`
  width: 85%;
  color: whitesmoke;
  background: #0e1217;
  border: none;
  border-radius: 5px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding: 5px 5px 5px 10px;
  &:focus {
    border: none;
    outline: 0;
    border-bottom: 2px solid rgba(29, 185, 84, 1);
  }
`;
export const Submit = styled.button`
  float: right;
  background: rgba(29, 185, 84, 0.8);
  width: 50%;
  border: none;
  border-radius: 18px;
  padding: 10px;
  margin-top: 5px;
  color: whitesmoke;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.13);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 2px 6px -1px rgba($primary, 0.65);
  }
`;
export const ErrorMessage = styled.p`
  color: tomato;
`;
