import { Survey, Submission } from "../../models/survey";
import answerModel from "../../models/survey/answer.model";
import questionModel from "../../models/survey/question.model";

/**
 * GET /survey
 */
export default {
  list_all_surveys: (req, res, next) => {
    Survey.find({}, "", (err, dbdata) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else {
        res.status(200).json({
          code: 200,
          data: dbdata,
          message: "Survey resources found."
        });
      }
    });
  },

  /**
   *
   */
  read_a_survey: (req, res, next) => {
    // Query daabase
    Survey.findById(req.params.id, "", (err, dbdata) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbdata == null) {
        res.status(404).send({
          code: 404,
          data: null,
          message: `Survey ${req.params.id} not found.`
        });
      } else {
        // return success response
        res.status(200).json({
          code: 200,
          data: dbdata,
          message: `${req.params.id} Survey resource found.`
        });
      }
    });
  },

  /**
   * POST /survey
   */
  create_a_survey: (req, res, next) => {

    // create the questions
    const questions = [];

    if (req.body.questionCollection.length > 0) {
      req.body.questionCollection.forEach(q_data => {
        const incoming_question = new questionModel(q_data);


        // ignore values submitted by user for system controlled fields
        incoming_question.createdAt = Date.now();
        incoming_question.updatedAt = Date.now();
        incoming_question.authorId = req.user.id;

        questions.push(incoming_question);
      });
      // get rid of the questionCollection since its no longer needed.
      delete req.body.questionCollection;
    } else {
      // TODO: Throw some error because the survey should have at least one question.
    }
    // cast incoming data as a Survey
    let incoming_survey = new Survey(req.body);

    // ignore values submitted by user for system controlled fiels
    incoming_survey.createdAt = Date.now();
    incoming_survey.updatedAt = Date.now();
    incoming_survey.authorId = req.user.id;

    // update each qestion's survey id
    questions.forEach(q => q.surveyId = incoming_survey._id);

    // persist to the database all the incoming_questions
    questionModel.insertMany(questions, (err, dbQuestions) => {
      if (err) {
        return res.status(500).send({
          code: 500,
          data: err,
          message: "Something went wrong persisiting the questions to the database."
        })
      }


      // update the survey's reference of its question
      dbQuestions.forEach(dbQ => {
        incoming_survey.questionCollection.push(dbQ);
      });

      // Persist to Database
      incoming_survey.save((err, dbData) => {
        // if error occured, return error response
        if (err) {
          if (err.name != "ValidationError") {
            res.status(502).send({});
          } else {
            res.status(400).send({
              code: 400,
              data: err,
              message: "Error persisting survey."
            });
          }
        }


        // return success response
        res.status(201).json({
          code: 201,
          data: dbData,
          message: `${dbData.title} survey has been created`
        });
      });
    })

  },

  /**
   * PUT /survey/:id
   * Use Case: Editing the fields of a survey but not its questions.
   */
  update_a_survey: (req, res, next) => {
    let documentToUpdate = undefined;
    let systemFields = ["__id", "createdAt", "updatedAt", "authorId", "questionCollection"];

    // Query database
    Survey.findById(req.params.id, "", (err, dbdata) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbdata == null) {
        res.status(4040).send({});
      } else {
        documentToUpdate = new Survey(dbdata);

        // Update the retrieved document with the data submitted
        // to the PUT request (ignoring system controlled fields).
        for (let key in req.body) {
          documentToUpdate[key] = systemFields.indexOf(key) == -1 ? req.body[key] : documentToUpdate[key];
        }

        // update updateAt date
        documentToUpdate.updatedAt = Date.now();

        //Persist to database updated document
        documentToUpdate.save((err, newDbdata) => {
          // if error occured, return error response
          if (err) {
            if (err.name != "ValidationError") {
              res.status(502).send({});
            } else {
              res.status(400).send({});
            }
          }

          // return success response
          res.status(200).json({
            code: 200,
            data: newDbdata,
            message: `${newDbdata.title} survey has been updated'`
          });
        });
      }
    });
  },

  /**
   * DELETE /survey/:id
   */
  delete_a_survey: (req, res, next) => {
    Survey.findOneAndDelete({ _id: req.params.id }, (err, dbData) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbData == null) {
        res.status(404).send({});
      }

      // return success response
      res.status(204).json({});
    });
  },

  /**
   * POST /survey/:id/submission
   */
  survey_submission: (req, res, next) => {
    // create the answers
    const answers = [];

    if (req.body.answerList.length > 0) {
      req.body.answerList.forEach(answer => {
        const incomingAnswer = new answerModel(answer);

        // update system controlled fields
        incomingAnswer.createdAt = Date.now();
        incomingAnswer.updatedAt = Date.now();

        answers.push(incomingAnswer);
      });
    }

    // save all the answers to the database
    answerModel.insertMany(answers, (err, dbAnswers) => {
      if (err) {
        return res.status(500).send({
          code: 500,
          data: err,
          message: "Something went wrong persisting the answers of submission."
        });
      }

      // create the submission
      delete req.body.answerList;
      let incoming_submission = new Submission(req.body);

      // push to the incoming_submission answerList the refs of dbAnswers
      dbAnswers.forEach(answer => {
        incoming_submission.answerList.push(answer);
      });
      // ignore values submitted by user for system controlled fields
      incoming_submission.createdAt = Date.now();
      incoming_submission.updatedAt = Date.now();
      incoming_submission.submitterId = req.user.id;
      incoming_submission.surveyId = req.params.id;  // might not be necessary since the body has surveyId

      // populate answerList of ids

      incoming_submission.save((err, dbData) => {
        // if error occured, return error response
        if (err) {
          if (err.name != "ValidationError") {
            res.status(502).send({});
          } else {
            res.status(400).send({
              code: 400,
              data: null,
              message: "Error persisting submission"
            });
          }
        }

        // return success response
        res.status(201).json({
          code: 201,
          data: dbData,
          message: `Survey submission persisted.`
        });
      });


    });


  }
};
