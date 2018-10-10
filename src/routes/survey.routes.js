import SurveyController from "../controllers/survey/survey.controller";
import isAuthenticated, { roleValidator } from "../services/middleware/auth.middleware";

export default app => {
  app
    .route("/surveys")
    .get(isAuthenticated(), roleValidator("ROLE_SURVEYER"), SurveyController.list_all_surveys)
    .post(isAuthenticated(), roleValidator("ROLE_SURVEYER"), SurveyController.create_a_survey);

  app
    .route("/surveys/:id")
    .get(isAuthenticated(), roleValidator("ROLE_USER"), SurveyController.read_a_survey)
    .put(isAuthenticated(), roleValidator("ROLE_SURVEYER"), SurveyController.update_a_survey)
    .delete(isAuthenticated(), roleValidator("ROLE_ADMIN"), SurveyController.delete_a_survey);

  app
    .route("/surveys/:id/submission")
    .post(isAuthenticated(), roleValidator("ROLE_USER"), SurveyController.survey_submission);
};
