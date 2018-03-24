const express = require('express');
const fire = require('../api/fire');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
	const user = fire.getUser(req.params.id);
	res.render('user', {
		title: config.title,
		user
	});
});

module.exports = router;
