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
    type: String,
    default: ""
  },
  authordId: {
    type: String,
    default: ""
  },
  answerBank: {
    type: [String],
    default: []
  },
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
