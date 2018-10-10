import mongoose, { Schema } from "mongoose";
import AnswerModel from "./answer.model";

const submissionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  submitterId: {
    type: String,
    default: "",
    required: true
  },
  submitterEmail: {
    type: String,
    default: ""
  },
  surveyId: {
    type: String,
    default: "",
    required: true
  },
  answerList: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

export default mongoose.model("Submission", submissionSchema);
