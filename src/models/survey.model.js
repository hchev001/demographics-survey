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
  questionCollection: {
    type: [String],
    default: []
  },
  audience: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Survey", surveySchema);
