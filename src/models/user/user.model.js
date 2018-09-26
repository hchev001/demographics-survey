import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
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

export default mongoose.model("User", UserSchema);
