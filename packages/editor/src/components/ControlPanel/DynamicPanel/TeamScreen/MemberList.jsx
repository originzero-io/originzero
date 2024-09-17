import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import styled from "styled-components";
import { setModal } from "store/reducers/componentSlice";
import useUser from "utils/hooks/useUser";
import useWorkspace from "utils/hooks/useWorkspace";
import Avatar from "components/Shared/Avatar/Avatar";
import useAuthPermission from "utils/hooks/useAuthPermission";

const StyledBox = styled.div`
  margin-top: 3px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.online ? "#4cd137" : "#95a5a6")};
  border-radius: 50%;
`;
export default function MemberList() {
  const dispatch = useDispatch();
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const getPermissions = useAuthPermission("team");
  const members = useMemo(
    () =>
      users.filter(({ workspaces }) =>
        workspaces.some((workspace) => workspace === activeWorkspace._id),
      ),
    [activeWorkspace, users],
  );
  return (
    <Table dark hover>
      <thead>
        <tr>
          <th />
          <th />
          <th>Online</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>E-Mail</th>
          <th>Phone</th>
          <th>Permissions</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={member._id}>
            <th scope="row">{index + 1}</th>
            <td>
              <Avatar avatar={member.avatar} />
            </td>
            <td>
              <StyledBox online={member.online} />
            </td>
            <td>{member.name}</td>
            <td>{member.username}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
            <td>
              {getPermissions("CAN_ASSIGN_PERMISSION") && (
                <Link to={`/panel/permissions/${member._id}`}>
                  <Button color="warning" style={{ fontSize: "1.2vmin" }}>
                    Manage Permissions
                  </Button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
