import Avatar from "components/Shared/Avatar/Avatar";
import * as GlobalStyled from "components/StyledComponents/DropdownMenu";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import AuthService from "services/authService/authService.http";
import { logOut } from "store/reducers/authSlice";
import useAuth from "utils/hooks/useAuth";
import CompanyLogo from "components/Shared/CompanyLogo";
import styled from "styled-components";
import { DropdownWrapper, DropdownList } from "components/StyledComponents/DropdownMenu";
import SearchBar from "components/Shared/SearchBar/SearchBar";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

const Container = styled.div`
  padding: 2px;
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
`;
const MenuItem = styled.div`
  color: #52bf04;
  cursor: pointer;
  padding: 8px;
  font-size: 2.5vmin;
  display: flex;
  align-items: center;
`;
const LeftSideContainer = styled.div`
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
`;
const RightSideContainer = styled.div`
  min-width: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInformation = styled.div`
  color: #52bf04;
  padding: 4px;
  font-size: 1.2vmin;
`;
const Profile = styled.div`
  cursor: pointer;
  margin-right: 2px;
  display: flex;
  align-items: center;
`;
const ProfileList = styled(DropdownList)`
  margin-top: 3px;
  font-size: 12px;
  display: none;
  ${DropdownWrapper}:focus-within & {
    display: flex;
  }
  background: #393939;
  border: 1px solid rgba(75, 75, 75, 0.4);
  color: #52bf04;
`;

export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { role, avatar, name } = useAuth();
  const { entityManagerSocket } = useEntityManagerSocket();

  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
      entityManagerSocket.disconnect();
      AuthService.logOut();
    }
  };
  return (
    <Container>
      <LeftSideContainer>
        <CompanyLogo size={55} />
      </LeftSideContainer>
      <RightSideContainer>
        <MenuItem>
          <IoNotificationsOutline />
        </MenuItem>
        <SearchBar
          containerStyle={{ width: "150px" }}
          inputStyle={{ borderRadius: "40px", height: "10%" }}
          theme="light"
        />
        {role === "admin" && (
          <Link to={`${url}/users`}>
            <MenuItem>
              <RiTeamLine />
            </MenuItem>
          </Link>
        )}

        <GlobalStyled.DropdownWrapper tabIndex="1" style={{ marginLeft: "5px" }}>
          <Profile>
            <Avatar avatar={avatar} size={36} />
            <UserInformation>
              <div>{name}</div>
              <div style={{ textAlign: "center", opacity: "0.8" }}>{role}</div>
            </UserInformation>
          </Profile>
          <ProfileList>
            <Link to={`${url}/learn`}>
              <GlobalStyled.DropdownItem style={{ color: "#52bf04" }}>
                Learn
              </GlobalStyled.DropdownItem>
            </Link>
            <GlobalStyled.DropdownItem style={{ color: "#52bf04" }}>
              Edit Profile
            </GlobalStyled.DropdownItem>
            <Link to={`${url}/settings`}>
              <GlobalStyled.DropdownItem style={{ color: "#52bf04" }}>
                User settings
              </GlobalStyled.DropdownItem>
            </Link>
            <GlobalStyled.DropdownItem onClick={logOutHandle}>Log out</GlobalStyled.DropdownItem>
          </ProfileList>
        </GlobalStyled.DropdownWrapper>
      </RightSideContainer>
    </Container>
  );
}
