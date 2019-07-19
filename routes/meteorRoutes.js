const express = require('express');

const router = express.Router();

const MeteorSchema = require('.././models/Post').Meteor;


router.get('/', (req, res, next) => {
  MeteorSchema.find()
    .then((result) => {
      res.status(200).json(
        result,
      );
    });
});

module.exports = router;
