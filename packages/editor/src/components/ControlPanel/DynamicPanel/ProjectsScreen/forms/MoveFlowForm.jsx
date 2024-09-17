import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useProject from "utils/hooks/useProject";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

export default function MoveFlow({ flow }) {
  const dispatch = useDispatch();
  const { projects } = useProject();
  const [selection, setSelection] = useState(flow.project);
  const { flowEvent } = useEntityManagerSocket();

  const changeHandle = (e) => {
    setSelection(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    flowEvent.moveFlow({ flow, newProject: selection });
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={submitHandle}>
      <div style={{ marginBottom: "10px" }}>Select Project</div>
      <Input type="select" onChange={changeHandle} value={selection}>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </Input>
      <Button style={{ marginTop: "10px" }} color="primary" type="submit">
        Move
      </Button>
    </Form>
  );
}
