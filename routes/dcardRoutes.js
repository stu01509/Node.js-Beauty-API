const express = require('express');
const apicache = require('apicache');

const cache = apicache.middleware;

const router = express.Router();

const DcardController = require('.././controllers/dcard');

router.get('/', cache('5 minutes'), DcardController.dcardGetAll);
router.get('/search', DcardController.dcardQuery);

module.exports = router;
