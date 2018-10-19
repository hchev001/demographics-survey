import { Question, Answer } from '../../models/survey';
import project from './question.controller.projection';



export default {
  list_all_questions: (req, res) => {
    Question
      .find({}, project(req.user, "GET /questions"))
      .populate("answer_ids_list")
      .exec((err, db_questions) => {
        // if error occured, return error response
        if (err) {
          res.status(500).send({
            code: 500,
            data: err,
            message: 'Something went wrong while fetching resources.'
          });
        } else {
          res.status(200).json({
            code: 200,
            data: db_questions,
            message: "Question resources found."
          });
        }
      });
  },
  read_a_question: (req, res) => {
    Question
      .findById(req.params.id, project(req.user, "GET /questions/:id"))
      .populate("answer_ids_list")
      .exec((err, db_question) => {
        // if error occured, return error response
        if (err) {
          res.status(500).send({
            code: 500,
            data: err,
            message: "Something went wrong while fetching resources"
          })
        } else if (db_question == null) {
          res.status(404).send({
            code: 404,
            data: {},
            message: `Survey ${req.params.id} not found.`
          });
        } else {
          // return the question found
          res.status(200).json({
            code: 200,
            data: db_question,
            message: `${req.params.id} question resource found.`
          });
        }
      });
  },
  create_a_question: (req, res) => {
    const incoming_question = new Question(req.body);
    incoming_question.authorId = req.user.id;

    const answers = [];

    req.body.answers.forEach(answer => {
      const instance = new Answer(answer);
      instance.parent_question_id = incoming_question._id; // tell the answer who its parent is
      incoming_question.answer_ids_list.push(instance._id); // tell the question who its child is
      answers.push(instance); // keep reference of the answer
    });

    Answer
      .insertMany(answers)
      .then(db_answers => {
        Question
          .create(incoming_question)
          .then(db_question => {
            // return the new question
            res.status(201).json({
              code: 201,
              data: db_question,
              message: 'New question resource created.'
            })
          })
          .catch(err => {
            res.status(500).send({
              code: 500,
              data: err,
              message: 'Something went wrong persisiting the question.'
            })
          })
      })
      .catch(err => {
        res.status(500).send({
          code: 500,
          data: err,
          message: "Something went wrong persisting the question answers."
        })
      })
  },
  update_a_question: (req, res) => {

    // set up the query object
    let query = null;
    if (req.params.id) {
      query = { _id: req.params.id }
    } else {
      return res.status(400).send({
        code: 400,
        data: null,
        message: "Update request missing id."
      });
    }

    // set up the update
    let update = req.body.update;
    let systemFields = ["_id", "createdAt", "updatedAt", "authorId"];
    for (let key in update) {
      if (update.hasOwnProperty(key)) {
        if (update[key] === systemFields[key])
          delete update[key];
      }
    }

    Question.findOneAndUpdate(query, update, (err, db_update) => {
      if (err) {
        res.status(500).send({})
      } else if (err == null) {
        res.status(404).send({})
      } else {
        res.status(200).json({
          code: 200,
          data: db_update,
          message: 'Document has been updated.'
        })
      }
    });



  },
  delete_a_question: (req, res) => {
    Question.findOneAndDelete({ _id: req.params.id }, (err, dbData) => {
      // if error occured, return erro response
      if (err) {
        return res.status(502).send({});
      } else if (dbData == null) {
        return res.status(404).send({
          code: 404,
          data: null,
          message: "Question resource not found"
        });
      }

      // return success response
      res.status(204).json({})
    })
  }
}