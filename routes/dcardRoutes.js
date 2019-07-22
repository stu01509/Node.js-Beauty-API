const express = require('express');

const router = express.Router();

const DcardController = require('.././controllers/dcard');

router.get('/', DcardController.dcardGetAll);
router.get('/search', DcardController.dcardQuery);

module.exports = router;
