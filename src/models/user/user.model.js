import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const User = new Schema({
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

User.pre("save", function(next) {
  const user = this;

  // only hash the password if it has been modified (or if is new)
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default new mongoose.model("User", User);
