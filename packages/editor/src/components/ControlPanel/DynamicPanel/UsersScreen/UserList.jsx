import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Badge, Button, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { deleteUser, getAllUsers } from "store/reducers/userSlice";
import { BiEdit } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "components/Shared/Avatar/Avatar";
import useUser from "utils/hooks/useUser";
import EditUserForm from "./EditUserForm";
import AddUserForm from "./AddUserForm";
import * as Styled from "./UsersScreen.style";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useUser();
  const addUserHandle = () => {
    dispatch(setModal(<AddUserForm />));
  };
  const deleteUserHandle = (user) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteUser(user));
    }
  };
  const editUserHandle = (user) => {
    dispatch(setModal(<EditUserForm user={user} />));
  };
  return (
    <Styled.UserListContainer>
      <Button onClick={() => dispatch(getAllUsers())}>Get Users</Button>
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
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <Avatar avatar={user.avatar} />
              </td>
              <td>
                <Styled.Box online={user.online} />
              </td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Badge color={user.role === "admin" ? "primary" : "warning"}>{user.role}</Badge>
              </td>
              <Styled.Td>
                <Styled.TdItem>
                  <BiEdit onClick={() => editUserHandle(user)} style={{ fontSize: "20px" }} />
                </Styled.TdItem>
                <Styled.TdItem onClick={() => deleteUserHandle(user)}>
                  <VscTrash style={{ fontSize: "20px" }} />
                </Styled.TdItem>
              </Styled.Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="primary" onClick={addUserHandle} style={{ width: "5%" }}>
        <AiOutlineUserAdd style={{ fontSize: "4vh" }} />
      </Button>
    </Styled.UserListContainer>
  );
}
