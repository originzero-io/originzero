import NoteService from "services/entityManagerService/noteService/noteService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getNotesByWorkspace = createAsyncThunk("notes/getByWorkspace", async (workspace) => {
  const notes = await NoteService.getNotes(workspace);
  return notes;
});

export const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, { payload }) {
      state.push(payload);
    },
    updateNote(state, { payload }) {
      const index = state.findIndex((note) => note._id === payload._id);
      state[index] = payload;
    },
    deleteNote(state, { payload }) {
      return state.filter((note) => note._id !== payload);
    },
  },
  extraReducers: {
    [getNotesByWorkspace.fulfilled]: (state, { payload }) => payload,
  },
});

export default noteSlice.reducer;
export const { createNote, updateNote, deleteNote } = noteSlice.actions;
