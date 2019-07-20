const express = require('express');

const router = express.Router();

const DcardSchema = require('.././models/Post').Dcard;

router.get('/', (req, res, next) => {
  DcardSchema.find()
    .limit(30)
    .then((result) => {
      res.status(200).json(
        result,
      );
    });
});

module.exports = router;
