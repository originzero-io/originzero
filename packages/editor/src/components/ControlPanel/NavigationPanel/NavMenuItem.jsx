import styled from "styled-components";

const NavMenuItemWrapper = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2px;
  padding: 7px;
  color: white;
  width: 100%;
  &:hover {
    background-color: #333333;
  }
  &:focus {
    background-color: #439c03;
  }
`;
export default function NavMenuItem({ label, icon, onClick }) {
  return (
    <NavMenuItemWrapper onClick={onClick}>
      {icon}
      <div style={{ paddingLeft: "5px", fontSize: "1.5vmin" }}>{label}</div>
    </NavMenuItemWrapper>
  );
}
