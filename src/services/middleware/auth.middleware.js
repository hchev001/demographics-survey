import jwt from "jsonwebtoken";
import config from "config";

/**
 * Middleware function for authenticating a user based on their JWT token.
 */
export default options => {
  return (req, res, next) => {
    // implement the middleware function based on the options object
    console.log(req);
    const token = req.headers["x-access-token"] || req.body.token;
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, config.get("secret"), (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      if (decoded) {
        console.log(decoded);
        req.user = decoded;
        next();
      } else {
        return res.status(500).send({ message: "something went wrong" });
      }
    });
  };
};
