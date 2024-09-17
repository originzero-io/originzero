import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useProject from "utils/hooks/useProject";
import wrapWithTryCatch from "utils/wrapWithTryCatch";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

const EditProjectForm = ({ project }) => {
  const { activeProject } = useProject();
  const [projectInfo, setprojectInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const { projectEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setprojectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = wrapWithTryCatch((e) => {
    e.preventDefault();
    projectEvent.updateProject({ project, projectInfo });
    dispatch(setModal(false));
  });
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Workspace name"
          onChange={onChangeHandler}
          defaultValue={activeProject.name}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default EditProjectForm;
