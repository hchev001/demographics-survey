import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    default: null,
    required: true
  },
  password: {
    type: String,
    default: null,
    required: true
  }
});

export default new mongoose.model("User", userSchema);
