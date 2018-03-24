const express = require('express');
const Static = require('../controllers/Static');

const router = express.Router();

/* GET home page. */
router.get('/', Static.home);

module.exports = router;
