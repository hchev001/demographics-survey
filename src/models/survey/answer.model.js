import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
  parent_question_id: {
    type: Schema.Types.ObjectId, ref: "Question"
  },
  content: {
    type: String,
    default: ""
  },
  answer_value: {
    type: Number,
    default: -1
  },
  position: {
    type: Number,
    default: -1
  }
}, { timestamps: true });

export default mongoose.model("Answer", answerSchema);
