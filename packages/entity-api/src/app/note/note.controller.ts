import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncErrorWrapper from "express-async-handler";
import NoteRepository from "./note.repository";

class NoteController {
  getAll = asyncErrorWrapper(async (req: Request, res: Response) => {
    const notes = await NoteRepository.getAll();
    res.status(200).send(notes);
  });

  get = asyncErrorWrapper(async (req: Request, res: Response) => {
    const noteId = req.params.note_id as unknown as Types.ObjectId;
    const note = await NoteRepository.getById(noteId);
    res.status(200).send(note);
  });

  getByWorkspace = asyncErrorWrapper(async (req: Request, res: Response) => {
    const workspaceId = req.params.workspace_id as unknown as Types.ObjectId;
    const notes = await NoteRepository.getByWorkspace(workspaceId);
    res.status(200).send(notes);
  });
}

export default new NoteController();
