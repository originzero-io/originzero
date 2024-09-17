import mongoose, { Schema, InferSchemaType } from "mongoose";
import Permission from "./permission.model";

const FlowSchema = new Schema(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    port: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: String,
    company: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
FlowSchema.post("deleteOne", async function () {
  const flowId = this.getFilter()._id;

  const response = await Permission.updateMany(
    {},
    {
      $pull: {
        "permissions.project.CAN_USAGE_FLOW": { flowId },
        "permissions.project.CAN_EDIT_FLOW": { flowId },
        "permissions.project.CAN_VIEW_FLOW": { flowId },
      },
    },
  );
  console.log("matchedCount: ", response.matchedCount);
  console.log("modifiedCount: ", response.modifiedCount);
});

FlowSchema.post("save", async function () {
  const flowId = this._id;
  const projectId = this.project;

  await Permission.updateOne(
    { workspaceId: this.workspace, userId: this.createdBy },
    {
      $push: {
        "permissions.project.CAN_USAGE_FLOW": {
          flowId,
          projectId,
        },
        "permissions.project.CAN_EDIT_FLOW": {
          flowId,
          projectId,
        },
        "permissions.project.CAN_VIEW_FLOW": {
          flowId,
          projectId,
        },
      },
    },
  );
});
export type Flow = InferSchemaType<typeof FlowSchema>;
export default mongoose.model("Flow", FlowSchema);
