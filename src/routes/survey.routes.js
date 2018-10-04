import SurveyController from "../controllers/survey/survey.controller";

export default app => {
  app
    .route("/surveys")
    .get(SurveyController.list_all_surveys),
    .post(SurveyController.create_a_survey);

  app
    .route("/surveys/:id")
    .get(SurveyController.read_a_survey)
    .put(SurveyController.update_a_survey)
    .delete(SurveyController.delete_a_survey);

  app
    .route("/surveys/:id/submission")
    .post(SurveyController.survey_submission);
};
