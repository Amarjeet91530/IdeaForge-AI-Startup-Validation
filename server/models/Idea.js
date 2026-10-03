import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    targetUsers: { type: String, default: "" },
    industry: { type: String, default: "" },
    analysis: { type: Object, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Idea", ideaSchema);
