/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const PermissionPresetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      unique: [true, "Please provide a unique name"],
    },
    preset: {
      type: Object,
    },
    workspaceId: {
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
  { timestamps: true }
);

export type PermissionPreset = InferSchemaType<typeof PermissionPresetSchema>;
export default mongoose.model("PermissionPreset", PermissionPresetSchema);
