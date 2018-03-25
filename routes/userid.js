const express = require('express');
const fire = require('../api/fire');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
	fire.getUserId(req.params.id).then((userId) => {
		res.redirect(`/user/${userId}`);
	});
});

module.exports = router;
