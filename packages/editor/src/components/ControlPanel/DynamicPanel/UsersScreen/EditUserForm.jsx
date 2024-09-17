import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import { editUser } from "store/reducers/userSlice";
import { Avatar } from "antd";
import { FaUserCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function EditUserForm({ user }) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(user);

  const onChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(editUser(userInfo));
    dispatch(setModal(false));
    notification.success("User updated");
  };
  const profilePictureHandle = (e) => {
    setUserInfo({ ...userInfo, avatar: e.target.files[0] });
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <div style={{ marginLeft: "35%" }}>
        <Avatar
          size={108}
          src={`${
            import.meta.env.VITE_HOST_ENV === "development"
              ? import.meta.env.VITE_GATEWAY_LOCAL_URL
              : import.meta.env.VITE_GATEWAY_CLOUD_URL
          }/uploads/${user.avatar}`}
          icon={<FaUserCheck style={{ fontSize: "48px" }} />}
        />
      </div>
      {/* <Input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="avatar"
        onChange={profilePictureHandle}
      /> */}
      <FormGroup>
        <Label>Name</Label>
        <Input
          name="name"
          placeholder="Full Name"
          onChange={onChangeHandler}
          required
          defaultValue={user.name}
        />
      </FormGroup>
      <FormGroup>
        <Label>Username</Label>
        <Input
          name="username"
          placeholder="Username"
          onChange={onChangeHandler}
          required
          defaultValue={user.username}
        />
      </FormGroup>
      <FormGroup>
        <Label>E mail</Label>
        <Input
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          required
          defaultValue={user.email}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input
          name="phone"
          placeholder="Phone number"
          onChange={onChangeHandler}
          minLength={11}
          maxLength={11}
          required
          defaultValue={user.phone}
        />
      </FormGroup>
      <Button color="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
