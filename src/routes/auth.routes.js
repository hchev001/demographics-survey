import { sign_up, log_in } from "../controllers/authentication/auth.controller";

export default app => {
  app.route("/login").get(log_in);

  app.route("/signup").post(sign_up);
};
