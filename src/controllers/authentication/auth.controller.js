import projection from "./auth.controller.projection";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { readFileSync } from "fs";

/**
 * POST /signup
 *
 * Register a new user.
 *
 * Expect req.body = {
 *  "username" : XXXXX,
 *  "password": yyyyyy
 * }
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
};

/**
 * POST /login
 *
 * Authenticates a User
 *
 * Expect req.body = {
 *  "username" : XXXXX,
 *  "password": yyyyyy
 * }
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @returns JWT
 */
export const log_in = (req, res, next) => {
  // find the user by their username
  User.findOne({ username: req.body.username }, { __v: 0 })
    .lean()
    .exec((err, dbData) => {
      if (err) {
        res.status(502).send({});
      } else if (typeof dbData === "undefined" || dbData === null) {
        res.status(404).send({});
      } else {
        // compare hash with provided password
        bcrypt.compare(req.body.password, dbData.password, (err, match) => {
          if (err) {
            res.status(500).send({}); // TODO: log to some global express log
          }

          if (match) {
            const issuer = "DemographicsAPI";
            const subject = "demo";
            const audience = "students";

            // signing options
            const signOptions = {
              issuer,
              subject,
              audience,
              expiresIn: "12h"
            };

            const token = jwt.sign(
              { id: dbData._id, username: dbData.username, role: dbData.role },
              config.get("secret"),
              signOptions
            );

            // remove the password field
            delete dbData.password;

            res
              .status(200)
              .json({ code: 200, data: dbData, message: "", token: token });
          } else {
            // invalid user data for logging in
            res.status(403).json({});
          }
        });
      }
    });
};
