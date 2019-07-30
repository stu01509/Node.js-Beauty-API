const express = require('express');
const apicache = require('apicache');

const cache = apicache.middleware;

const router = express.Router();

const MeteorController = require('.././controllers/meteor');

router.get('/', cache('5 minutes'), MeteorController.meteorGetAll);
router.get('/search', MeteorController.meteorQuery);

module.exports = router;
