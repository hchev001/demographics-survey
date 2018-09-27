import projection from "./auth.controller.projection";
import { User } from "../../models/user";
import bcrypt from "bcrypt";

export const sign_up = (req, res, next) => {
  const saltRounds = 14;
  // encrypt the password
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      username: req.body.username,
      password: hash
    }).then(data => {
      if (data) {
        res.status(200).json({
          code: 200,
          data: {},
          message: `User ${data.username} has been created.`
        });
      } else {
        res.status(500).send(err);
      }
    });
  });
  // create new user model from encrypted password and username
  // store the user in the database
  // return 200 on success
  // return 500 on error
};

export const log_in = (req, res, next) => {};
