import UserController from "../controllers/user/user.controller";
import isAuthenticated from "../services/middleware/auth.middleware";

export default app => {
  app
    .route("/users")
    .get(isAuthenticated(), UserController.list_all_users)
    .post(isAuthenticated(), UserController.create_a_user);

  app
    .route("/users/:id")
    .get(isAuthenticated(), UserController.read_a_user)
    .put(isAuthenticated(), UserController.update_a_user)
    .delete(isAuthenticated(), UserController.delete_a_user);
};
