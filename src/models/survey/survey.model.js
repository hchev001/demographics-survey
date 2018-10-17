import mongoose, { Schema } from "mongoose";

const surveySchema = new Schema({
  published: {
    type: Boolean,
    default: true
  },
  authorId: {
    type: String,
    default: ""
  },
  question_ids: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  audience: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: null,
    required: true
  }
}, {
    timestamps: true
  });

export default mongoose.model("Survey", surveySchema);
