import UserController from "../controllers";

export default app => {
  app
    .route("/users")
    .get(UserController.list_all_users)
    .post(UserController.create_a_user);

  app
    .route("/users/:id")
    .get(UserController.read_a_user)
    .put(UserController.update_a_user)
    .delete(UserController.delete_a_user);
};
