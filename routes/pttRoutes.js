const express = require('express');

const router = express.Router();

const PttSchema = require('.././models/Post').Ptt;

router.get('/', (req, res, next) => {
  PttSchema.find()
    .limit(30)
    .then((result) => {
      res.status(200).json(
        result,
      );
    });
});

module.exports = router;
