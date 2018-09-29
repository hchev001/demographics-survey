import projection from "./user.controller.projection";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import config from "config";

export default {
  /**
   * GET/
   */
  list_all_users: (req, res) => {
    // Process request //
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    // verify token
    jwt.verify(token, config.get("secret"), (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      if (decoded) console.log(decoded);
    });

    // Query database
    User.find({}, projection(req.user, "GET /users"), (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else {
        // Return success response
        res.status(200).json({
          code: 200,
          data: dbData,
          message: ""
        });
      }
    });
  },

  /**
   * GET/:id
   */
  read_a_user: (req, res) => {
    // Process request //

    // Query database
    User.findById(
      req.params.id,
      projection(req.user, "GET /users/:id"),
      (err, dbData) => {
        // If error occured, return error response
        if (err) {
          res.status(502).send({});
        } else if (dbData == null) {
          res.status(404).send({});
        } else {
          // Return success response
          res.status(200).json({
            code: 200,
            data: dbData,
            message: ""
          });
        }
      }
    );
  },

  /**
   * POST/
   */
  create_a_user: (req, res) => {
    // Process request //

    // Cast incoming data as a User.
    let user = new User(req.body);

    // Ignore values submitted by user for system controlled fields.
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    // Query database
    user.save((err, dbData) => {
      // If error occured, return error respons
      if (err) {
        if (err.name != "ValidationError") {
          res.status(502).send({});
        } else {
          res.status(400).send({});
        }
      }

      // Return success response
      res.status(201).json({
        code: 201,
        data: dbData,
        message: ""
      });
    });
  },

  /**
   * PUT/:id
   */
  update_a_user: (req, res) => {
    // Process request //

    let documentToUpdate = undefined;
    let systemFields = ["_id", "id", "createdAt", "updatedAt", "password"];

    // Query database
    User.findById(
      req.params.id,
      projection({ route: "PUT /users/:id" }),
      (err, dbData) => {
        // If error occured, return error response
        if (err) {
          res.status(502).send({});
        } else if (dbData == null) {
          res.status(404).send({});
        } else {
          documentToUpdate = dbData;
        }
      }
    );

    // Cast documentToUpdate as a User (to facilitate unit testing)
    documentToUpdate = new User(documentToUpdate);

    // Update the retrieved document with the data submitted
    // to the PUT request (ignoring system controlled fields).
    for (let key in req.body) {
      documentToUpdate[key] =
        systemFields.indexOf(key) == -1 ? req.body[key] : documentToUpdate[key];
    }

    // Update updatedAt date
    documentToUpdate.updatedAt = Date.now();

    // Query database
    documentToUpdate.save((err, dbData) => {
      // If error occured, return error response
      if (err) {
        if (err.name != "ValidationError") {
          res.status(502).send({});
        } else {
          res.status(400).send({});
        }
      }

      // Return success response
      res.status(200).json({
        code: 200,
        data: dbData,
        message: ""
      });
    });
  },

  /**
   * DELETE/:id
   */
  delete_a_user: (req, res) => {
    // Process request //

    // Query database
    User.remove({ _id: req.params.id }, (err, dbData) => {
      // If error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbData == null) {
        res.status(404).send({});
      }

      // Return success response
      res.status(204).json({});
    });
  }
};
