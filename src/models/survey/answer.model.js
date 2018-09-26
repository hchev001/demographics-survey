import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  questionId: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Answer", answerSchema);
