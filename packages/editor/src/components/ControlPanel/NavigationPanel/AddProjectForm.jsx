import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import useWorkspace from "utils/hooks/useWorkspace";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

const AddProjectForm = () => {
  const { activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const [projectInfo, setProjectInfo] = useState({
    name: null,
    description: "",
    createdBy: auth._id,
    workspace: activeWorkspace._id,
  });
  const dispatch = useDispatch();

  const { projectEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    projectEvent.createProject({ project: projectInfo });
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Project Name</Label>
        <Input name="name" placeholder="project name" onChange={onChangeHandler} required />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input name="description" placeholder="description" onChange={onChangeHandler} />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AddProjectForm;
