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
    type: Schema.Types.ObjectId, ref: "Question"
  },
  content: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Answer", answerSchema);
