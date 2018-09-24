import mongoose, { Schema } from "mongoose";

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
    default: ""
  },
  submitterEmail: {
    type: String,
    default: ""
  },
  surveyId: {
    type: String,
    default: ""
  },
  answerList: {
    type: [String],
    default: ""
  }
});

export default mongoose.model("Submission", submissionSchema);
