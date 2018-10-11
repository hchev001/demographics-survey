import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  surveyId: {
    type: Schema.Types.ObjectId,
    ref: "Survey"
  },
  authorId: {
    type: String,
    default: null
  },
  answerBank: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  type: {
    type: String,
    default: ""
  },
  topic: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Question", questionSchema);
