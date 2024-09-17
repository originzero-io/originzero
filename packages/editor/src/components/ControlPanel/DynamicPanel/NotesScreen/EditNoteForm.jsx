import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import PropTypes from "prop-types";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

const propTypes = {
  note: PropTypes.object.isRequired,
};
const EditNoteForm = ({ note }) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [noteInfo, setNoteInfo] = useState(note);
  const { noteEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setNoteInfo({ ...noteInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    noteEvent.updateNote({ note: noteInfo });
    dispatch(setModal(false));
  };
  return (
    <>
      {note.createdBy._id === auth._id ? (
        <Form onSubmit={onSubmitHandle}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              name="title"
              placeholder="Title"
              onChange={onChangeHandler}
              required
              defaultValue={note.title}
            />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input
              name="content"
              placeholder="Content"
              type="textarea"
              onChange={onChangeHandler}
              required
              defaultValue={note.content}
            />
          </FormGroup>
          <Button type="submit">Update</Button>
        </Form>
      ) : (
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "2vmin" }}>{note.title}</div>
          <div style={{ fontSize: "1.5vmin" }}>{note.content}</div>
        </div>
      )}
    </>
  );
};
EditNoteForm.propTypes = propTypes;
export default EditNoteForm;
