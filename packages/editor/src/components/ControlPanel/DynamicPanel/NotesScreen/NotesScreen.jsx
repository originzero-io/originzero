import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import useNotes from "utils/hooks/useNotes";
import Avatar from "components/Shared/Avatar/Avatar";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import * as Styled from "./NotesScreen.style";

export default function NotesScreen() {
  const notes = useNotes();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [hoveredNote, setHoveredNote] = useState("");
  const { noteEvent } = useEntityManagerSocket();

  const addNoteHandle = () => {
    dispatch(setModal(<AddNoteForm />));
  };
  const deleteNoteHandle = (event, note) => {
    event.stopPropagation();
    if (confirm("Sure?")) {
      noteEvent.deleteNote({ note });
    }
  };
  const viewNoteHandle = (note) => {
    dispatch(setModal(<EditNoteForm note={note} />));
  };
  return (
    <>
      <Button color="success" onClick={addNoteHandle}>
        <BsPlusCircle style={{ fontSize: "2.5vmin" }} /> Add Note
      </Button>
      {notes.map((note) => (
        <Styled.NoteContainer
          key={note._id}
          onMouseEnter={() => setHoveredNote(note._id)}
          onMouseLeave={() => setHoveredNote(false)}
          onClick={() => viewNoteHandle(note)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "95%" }}>
              <Styled.NoteTitle>{note.title}</Styled.NoteTitle>
              <Styled.NoteContent>{note.content}</Styled.NoteContent>
            </div>
            {hoveredNote === note._id && note.createdBy._id === auth._id && (
              <div
                style={{
                  width: "5%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <VscTrash
                  style={{ fontSize: "3vmin", color: "tomato" }}
                  onClick={(event) => deleteNoteHandle(event, note)}
                />
              </div>
            )}
          </div>
          <div>
            <div style={{ float: "right" }}>
              <Avatar avatar={note.createdBy.avatar} size={24} />
              <span
                style={{
                  fontSize: "1.2vmin",
                  paddingRight: "10px",
                  paddingLeft: "5px",
                  color: "#7f8c8d",
                }}
              >
                {note.createdBy.name}
              </span>
            </div>
          </div>
        </Styled.NoteContainer>
      ))}
    </>
  );
}
