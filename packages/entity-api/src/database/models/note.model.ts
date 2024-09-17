/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType } from "mongoose";

const NoteSchema = new Schema(
  {
    _id: Schema.ObjectId,
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: [true, "Note title must be unique"],
    },
    content: {
      type: String,
      required: [true, "Please provide a name"],
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Please provide a flow"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
  },
  { timestamps: true },
);

export type Note = InferSchemaType<typeof NoteSchema>;
export default mongoose.model("Note", NoteSchema);
