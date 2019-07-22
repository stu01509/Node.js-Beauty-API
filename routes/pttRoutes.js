const express = require('express');

const router = express.Router();

const PttController = require('.././controllers/ptt');

router.get('/', PttController.pttGetAll);
router.get('/search', PttController.pttQuery);

module.exports = router;
