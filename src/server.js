import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import config from "config";
import SampleRoutes from "./routes/sample.routes";
import UserRoutes from "./routes/user.routes";
import User from "./models/user";

let app = express();

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(
//     config.DBHost,
//     {
//       connectTimeoutMS: 30000,
//       keepAlive: 1,
//       useNewUrlParser: true
//     }
//   )
//   .catch(() => {
//     console.log("Failed to connect to mongodb server");
//   });
let port = config.PORT;
mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.DBHost,
    {
      connectTimeoutMS: 30000,
      keepAlive: 1,
      useNewUrlParser: true
    }
  )
  .catch(() => {
    console.log("Failed to connect to mongodb server");
  });

// Assume that if a qurest contains data it is encoded as JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Decode request data
app.use(bodyParser.json());

// const testUser = new User({
//   username: "jmar777",
//   password: "Password123"
// });

// testUser.save(err => {
//   if (err) throw err;

//   User.findOne({ username: "jmar777" }, (err, user) => {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword("Password123", (err, isMatch) => {
//       if (err) throw err;
//       console.log("Password123:", isMatch);
//     });

//     // test a failing password
//     user.comparePassword("123Password", (err, isMatch) => {
//       if (err) throw err;
//       console.log("123Password:", isMatch);
//     });
//   });
// });

SampleRoutes(app);
UserRoutes(app);

app.listen(port);

console.log(`Server is listening on port ${port}`);

export default app;
