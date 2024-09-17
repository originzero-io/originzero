/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType, Types } from "mongoose";
import Flow from "./flow.model";
import Note from "./note.model";
import Permission from "./permission.model";
import Project from "./project.model";
import User from "./user.model";

const WorkspaceSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
  },
  { timestamps: true },
);
WorkspaceSchema.post("deleteOne", async function () {
  const workspaceId = this.getFilter()["_id"];
  await Project.deleteMany({ workspace: workspaceId });
  await Flow.deleteMany({ workspace: workspaceId });
  await Note.deleteMany({ workspace: workspaceId });
  await Permission.deleteMany({ workspaceId: workspaceId });

  // also delete entity in user.workspaces array
  await User.updateMany(
    {},
    {
      $pull: {
        workspaces: workspaceId,
      },
    },
  );
});
export type Workspace = InferSchemaType<typeof WorkspaceSchema>;
export default mongoose.model("Workspace", WorkspaceSchema);
