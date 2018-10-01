import {Survey} from "../../models/survey"

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
          message: ""
        })
      }
    })
  },

  read_a_survey: (req, res, next) => {

    // Query daabase
    User.findById(req.params.id, '', (err, dbdata) => {
      // if error occured, return error response
      if (err) {
        res.status(502).send({});
      } else if (dbdata == null) {
        res.status(404).send({}) {
          res.status(404).send({});
        }
      } else {
        // return success response
        res.status(200).json({
          code: 200,
          data: dbdata,
          message: ""
        })
      }
    })
  },

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

  update_a_survey: (req, res, next) => {

    let documentToUpdate = undefined;
    let systemFields = ["__id", "createdAt", "updatedAt", "authorId"];

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
  }
}