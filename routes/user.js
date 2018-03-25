const express = require('express');
const fire = require('../api/fire');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
	fire.getUser(req.params.id).then((user) => {
		fire.getPosts(req.params.id).then((posts) => {
			res.render('user', {
				title: config.title,
				user,
				posts
			});
		});
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;
