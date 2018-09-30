import UserController from "../controllers/user/user.controller";
import isAuthenticated, {
  roleValidator
} from "../services/middleware/auth.middleware";

export default app => {
  app
    .route("/users")
    .get(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYER"),
      UserController.list_all_users
    )
    .post(
      isAuthenticated(),
      roleValidator("ROLE_ADMIN"),
      UserController.create_a_user
    );

  app
    .route("/users/:id")
    .get(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYER"),
      UserController.read_a_user
    )
    .put(
      isAuthenticated(),
      roleValidator("ROLE_USER"),
      UserController.update_a_user
    )
    .delete(
      isAuthenticated(),
      roleValidator("ROLE_ADMIN"),
      UserController.delete_a_user
    );
};
