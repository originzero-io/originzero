import { Socket, Server } from "socket.io";
import { Types } from "mongoose";
import NoteRepository from "./note.repository";
import { Note } from "../../database/models/note.model";

interface Data {
  note: Note;
}
const NoteHandler = (io: Server, socket: Socket) => {
  const create = async (data: Data) => {
    try {
      const note = await NoteRepository.create(data.note);
      io.emit("notes:create", { note });
    } catch (error: any) {
      socket.emit("notes:create", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  const update = async (data: Data) => {
    try {
      const noteId = data.note._id as Types.ObjectId;
      const newNote = data.note;
      const note = await NoteRepository.update(noteId, newNote);
      io.emit("notes:update", { note });
    } catch (error: any) {
      socket.emit("notes:update", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  const remove = async (data: Data) => {
    try {
      const noteId = await NoteRepository.deleteBase(
        data.note._id as Types.ObjectId,
      );
      io.emit("notes:delete", { noteId });
    } catch (error: any) {
      socket.emit("notes:delete", {
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  return { create, update, remove };
};

export default NoteHandler;
