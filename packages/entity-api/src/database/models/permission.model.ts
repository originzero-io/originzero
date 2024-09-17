/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType } from "mongoose";

const deviceSchema = new Schema({
  CAN_CREATE_CONTROLLER: {
    type: Boolean,
    required: true,
  },
  CAN_CREATE_PROCESSOR: {
    type: Boolean,
    required: true,
  },

  CAN_USAGE_CONTROLLER_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_USAGE_CONTROLLER: [
    {
      type: String,
      required: true,
    },
  ],

  CAN_USAGE_PROCESSOR_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_USAGE_PROCESSOR: [
    {
      type: String,
      required: true,
    },
  ],

  CAN_EDIT_CONTROLLER_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_EDIT_CONTROLLER: [
    {
      type: String,
      required: true,
    },
  ],

  CAN_EDIT_PROCESSOR_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_EDIT_PROCESSOR: [
    {
      type: String,
      required: true,
    },
  ],
});
const projectSchema = new Schema({
  CAN_CREATE_PROJECT: {
    type: Boolean,
    required: true,
  },
  CAN_CREATE_DASHBOARD_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_CREATE_DASHBOARD: [
    {
      type: String,
      required: true,
    },
  ],
  CAN_CREATE_FLOW_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_CREATE_FLOW: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_USAGE_PROJECT_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_USAGE_PROJECT: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_USAGE_FLOW_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_USAGE_FLOW: [
    {
      flowId: {
        type: Schema.Types.ObjectId,
        ref: "Flow",
      },
      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    },
  ],
  CAN_USAGE_DASHBOARD_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_USAGE_DASHBOARD: [
    {
      type: String,
      required: true,
    },
  ],
  CAN_EDIT_PROJECT_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_EDIT_PROJECT: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_EDIT_FLOW_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_EDIT_FLOW: [
    {
      flowId: {
        type: Schema.Types.ObjectId,
        ref: "Flow",
      },
      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    },
  ],
  CAN_EDIT_DASHBOARD_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_EDIT_DASHBOARD: [
    {
      type: String,
      required: true,
    },
  ],
  CAN_EDIT_NODE: [
    {
      type: String,
      required: true,
    },
  ],
  CAN_VIEW_PROJECT_ALL: {
    type: Boolean,
    required: true,
  },
  CAN_VIEW_PROJECT: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_VIEW_FLOW_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_VIEW_FLOW: [
    {
      flowId: {
        type: Schema.Types.ObjectId,
        ref: "Flow",
      },
      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    },
  ],
  CAN_VIEW_DASHBOARD_ALL: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  ],
  CAN_VIEW_DASHBOARD: [
    {
      type: String,
      required: true,
    },
  ],
});

const teamSchema = new Schema({
  CAN_INVITE_MEMBER: {
    type: Boolean,
    required: true,
  },
  CAN_REMOVE_MEMBER: {
    type: Boolean,
    required: true,
  },
  CAN_ASSIGN_PERMISSION: {
    type: Boolean,
    required: true,
  },
});

const PermissionSchema = new Schema(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Please provide a workspace id"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    permissions: {
      CAN_DO_EVERYTHING: {
        type: Boolean,
        required: true,
      },
      device: {
        type: deviceSchema,
        required: true,
      },
      project: {
        type: projectSchema,
        required: true,
      },
      team: {
        type: teamSchema,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export type Permission = InferSchemaType<typeof PermissionSchema>;
export default mongoose.model("Permission", PermissionSchema);
