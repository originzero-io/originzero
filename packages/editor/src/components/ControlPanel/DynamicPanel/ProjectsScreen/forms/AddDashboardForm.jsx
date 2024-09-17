import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import uuid from "react-uuid";
import { setModal } from "store/reducers/componentSlice";

export default function AddDashboardForm() {
  const { activeProject } = useSelector((state) => state.controlPanel);

  const [dashboardInfo, setDashboardInfo] = useState({
    id: null,
    name: null,
    description: null,
    projectId: null,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setDashboardInfo({ ...dashboardInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(setModal(false));
  };

  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Dashboard Name</Label>
        <Input name="name" placeholder="dashboard name" onChange={onChangeHandler} required />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="textarea"
          name="description"
          placeholder="description"
          onChange={onChangeHandler}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
