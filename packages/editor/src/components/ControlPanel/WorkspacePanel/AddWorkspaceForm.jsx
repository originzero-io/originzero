import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createWorkspace, getMyWorkspaces } from "store/reducers/workspaceSlice";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

export default function AddWorkspaceForm() {
  const auth = useAuth();
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: null,
    createdBy: auth._id,
  });
  const dispatch = useDispatch();
  const { workspaceEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setWorkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    workspaceEvent.createWorkspace({ workspace: workspaceInfo });
    dispatch(getMyWorkspaces());
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input name="name" placeholder="Workspace name" onChange={onChangeHandler} required />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
