import styled from "styled-components";

export const Header = styled.div`
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 12px;
`;
export const SectionName = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #262626;
  padding-bottom: 8px;
`;
export const FormStyle = {
  padding: "12px",
};

export const InputWrapper = styled.div`
  color: #a8a8a8;
  border-radius: 4px;
`;
export const InputStyled = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 6px;
  padding-left: 10px;
  background-color: #262626;
  border: 1px solid #3a3a3a;
  color: #c1c1c1;
  outline: none;
  &:focus {
    border: 1px solid #43b104;
  }
`;
