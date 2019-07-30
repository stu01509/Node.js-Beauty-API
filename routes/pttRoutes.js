const express = require('express');
const apicache = require('apicache');

const cache = apicache.middleware;

const router = express.Router();

const PttController = require('.././controllers/ptt');

router.get('/', cache('5 minutes'), PttController.pttGetAll);
router.get('/search', PttController.pttQuery);

module.exports = router;
