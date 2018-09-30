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
  },
  role: {
    // determines what permissions a User has
    type: [String], // ["ROLE_USER", "ROLE_SURVEYER", "ROLE_ADMIN"]
    default: ["ROLE_USER"]
  }
});

export default mongoose.model("User", UserSchema);
