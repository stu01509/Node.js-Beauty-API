const express = require('express');

const router = express.Router();

const MeteorController = require('.././controllers/meteor');

router.get('/', MeteorController.meteorGetAll);
router.get('/search', MeteorController.meteorQuery);

module.exports = router;
