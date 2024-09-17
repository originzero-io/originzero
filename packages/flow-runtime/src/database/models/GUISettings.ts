/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import mongoose, { Schema, InferSchemaType } from "mongoose";

const GUISettingsSchema = new Schema(
  {
    viewport: {
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
      zoom: {
        type: Number,
      },
    },
    miniMapDisplay: {
      type: String,
      default: "visible",
    },
    groupBarDisplay: {
      type: String,
      default: "hidden",
    },
    edgeType: {
      type: String,
      default: "bezier",
    },
    theme: {
      type: String,
      default: "dark",
    },
    nodeGroupMenuDisplay: {
      type: Boolean,
      default: false,
    },
    paneClickPosition: {
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
    },
  },
  { versionKey: false }
);

export type GUISettingsType = InferSchemaType<typeof GUISettingsSchema>;
export default mongoose.model("GUISettings", GUISettingsSchema);
