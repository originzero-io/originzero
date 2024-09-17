import { Types } from "mongoose";
import NoteModel, { Note } from "../../database/models/note.model";
import IRepositorty from "../../database/base.repository";

class NoteRepository extends IRepositorty<Note> {
  async create(note: Note) {
    const noteRecord = await this.createBase(note);
    await noteRecord.populate("workspace");
    await noteRecord.populate("createdBy");
    return noteRecord;
  }

  async update(noteId: Types.ObjectId, newNote: any) {
    const note = await this.model
      .findByIdAndUpdate(noteId, newNote, {
        new: true,
      })
      .populate("workspace")
      .populate("createdBy");
    return note;
  }

  async getByWorkspace(workspaceId: Types.ObjectId) {
    const notes = await this.model
      .find({ workspace: workspaceId })
      .populate("createdBy", "username name avatar");
    return notes;
  }

  async getAll() {
    const notes = await this.model
      .find({})
      .populate("createdBy", "username name avatar");

    return notes;
  }
}

export default new NoteRepository(NoteModel);
