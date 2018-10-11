import mongoose, { Schema } from "mongoose";

const surveySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: true
  },
  authorId: {
    type: String,
    default: ""
  },
  questionCollection: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  audience: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: null,
    required: true
  }
});

export default mongoose.model("Survey", surveySchema);
