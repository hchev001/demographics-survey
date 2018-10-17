import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  surveyId: {
    type: Schema.Types.ObjectId,
    ref: "Survey"
  },
  authorId: {
    type: String,
    default: null
  },
  answer_ids_list: [
    { type: Schema.Types.ObjectId, ref: "Answer" }
  ],
  questionType: {
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
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
