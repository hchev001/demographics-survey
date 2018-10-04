import {Survey, Submission} from "../../models/survey"

/**
 * GET /survey
 */
export default {
  list_all_surveys: (req, res, next) => {
    Survey.find({}, '', (err, dbdata) => {

      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else {
        res.status(200).json({
          code: 200,
          data: dbdata,
          message: "Survey resources found."
        })
      }
    })
  },

  /**
   * 
   */
  read_a_survey: (req, res, next) => {

    // Query daabase
    User.findById(req.params.id, '', (err, dbdata) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbdata == null) {
        res.status(404).send({}) {
          res.status(404).send({
            code: 404,
            data: null,
            message: `Survey ${req.params.id} not found.`
          });
        }
      } else {
        // return success response
        res.status(200).json({
          code: 200,
          data: dbdata,
          message: `${req.params.id} Survey resource found.`
        })
      }
    })
  },

  /**
   * POST /survey
   */
  create_a_survey: (req, res, next) => {

    // cast incoming data as a Survey
    let incoming_survey = new Survey(req.body);

    // ignore values submitted by user for system controlled fiels
    incoming_survey.createdAt = Date.now();
    incoming_survey.updatedAt = Date.now();
    incoming_survey.authorId = req.user.id;

    // Persist to Database
    incoming_survey.save((err, dbdata) => {
      // if error occured, return error response
      if (err) {
        if (err.name != "ValidationError"){
          res.status(502).send({});
        } else {
          res.status(400).send({});
        }
      }

      // return success response
      res.status(201).json({
        code: 201,
        data: dbdata,
        message: `${dbData.title} survey has been created`
      });
    });

  },

  /**
   * PUT /survey/:id
   * Use Case: Editing the fields of a survey but not its questions.
   */
  update_a_survey: (req, res, next) => {

    let documentToUpdate = undefined;
    let systemFields = ["__id", "createdAt", "updatedAt", "authorId", "questionCollection"];

    // Query database
    Survey.findById(req.params.id, '', (err, dbdata) => {
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
          documentToUpdate[key] = systemFields.indexOf[key] == -1 ? req.body[key] : documentToUpdate[key];
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
        })
      }
    })
  },

  /**
   * DELETE /survey/:id
   */
  delete_a_survey: (req, res, next) => {
    Survey.fineOneAndDelete({_id: req.params.id}, (err, dbData) => {
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
    let incoming_submission = new Submission(req.body);

    // ignore values submitted by user for system controlled fields
    incoming_submission.createdAt = Date.now();
    incoming_submission.updatedAt = Date.now();
    incoming_submission.submitterId = req.user.id;
    incoming_submission.surveyId = req.params.id;

    // Update each Answer model with its question model id
    if (incoming_submission.answerList.length > 0){
      incoming_submission.answerList.forEach((answer) => {
        answer.questionId = req.user.id;
      })
    }

    incoming_submission.save((err, dbData) => {
      // if error occured, return error response
      if (err) {
        if (err.name != "ValidationError"){
          res.status(502).send({});
        } else {
          res.status(400).send({
            code: 400,
            data: null,
            message: "Error persisting submission"
          })
        }
      }

      // return success response
      res.status(201).json({
        code: 201,
        data:dbData,
        message: `Survey submission persisted.`
      })
    })
  }
}