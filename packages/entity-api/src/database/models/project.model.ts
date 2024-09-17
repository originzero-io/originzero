/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { InferSchemaType, Schema } from "mongoose";
import Flow from "./flow.model";
import Permission from "./permission.model";

const ProjectSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: String,
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Please provide a workspace id"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
  },
  { timestamps: true },
);

ProjectSchema.post("deleteOne", async function () {
  const projectId = this.getFilter()._id;

  await Flow.deleteMany({ project: projectId });

  const response = await Permission.updateMany(
    {},
    {
      $pull: {
        "permissions.project.CAN_CREATE_DASHBOARD": projectId,
        "permissions.project.CAN_CREATE_FLOW": projectId,
        "permissions.project.CAN_USAGE_PROJECT": projectId,
        "permissions.project.CAN_USAGE_FLOW_ALL": projectId,
        "permissions.project.CAN_USAGE_DASHBOARD_ALL": projectId,
        "permissions.project.CAN_EDIT_PROJECT": projectId,
        "permissions.project.CAN_EDIT_FLOW_ALL": projectId,
        "permissions.project.CAN_EDIT_DASHBOARD_ALL": projectId,
        "permissions.project.CAN_VIEW_PROJECT": projectId,
        "permissions.project.CAN_VIEW_FLOW_ALL": projectId,
        "permissions.project.CAN_VIEW_DASHBOARD_ALL": projectId,
        "permissions.project.CAN_USAGE_FLOW": { projectId },
        "permissions.project.CAN_EDIT_FLOW": { projectId },
        "permissions.project.CAN_VIEW_FLOW": { projectId },
      },
    },
  );
  console.log("matchedCount: ", response.matchedCount);
  console.log("modifiedCount: ", response.modifiedCount);
});

export type Project = InferSchemaType<typeof ProjectSchema>;
export default mongoose.model("Project", ProjectSchema);
