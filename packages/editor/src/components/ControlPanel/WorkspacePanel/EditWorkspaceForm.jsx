import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";
import { setModal } from "store/reducers/componentSlice";
import useWorkspace from "utils/hooks/useWorkspace";

export default function EditWorkspaceForm({ workspace }) {
  const { activeWorkspace } = useWorkspace();
  const [workspaceInfo, setworkspaceInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const { workspaceEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setworkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    workspaceEvent.updateWorkspace({ workspace, workspaceInfo });
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Workspace name"
          onChange={onChangeHandler}
          defaultValue={activeWorkspace.name}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
