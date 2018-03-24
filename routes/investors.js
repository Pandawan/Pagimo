const express = require('express');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.render('investors', {
		title: config.title
	});
});

module.exports = router;
