import mongoose from "mongoose";

const { Schema } = mongoose;

const ElementSchema = new Schema(
  {
    nodes: {
      type: Array,
      required: [true, "Please provide a Node array"],
    },
    edges: {
      type: Array,
      required: [true, "Please provide a Edge array"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Element", ElementSchema);
