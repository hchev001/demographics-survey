import QuestionController from "../controllers/questions/question.controller";
import isAuthenticated, { roleValidator } from "../services/middleware/auth.middleware";

export default app => {
  app
    .route("/questions")
    .get(isAuthenticated(), roleValidator("ROLE_SURVEYER"),
      QuestionController.list_all_questions
    )
    .post(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYOR"),
      QuestionController.create_a_question
    );

  app
    .route("/questions/:id")
    .get(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYOR"),
      QuestionController.read_a_question
    )
    .post(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYOR"),
      QuestionController.create_a_question
    )
    .put(
      isAuthenticated(),
      roleValidator("ROLE_SURVEYOR"),
      QuestionController.update_a_question
    )
    .delete(
      isAuthenticated(),
      roleValidator("ROLE_ADMIN"),
      QuestionController.delete_a_question
    );
};