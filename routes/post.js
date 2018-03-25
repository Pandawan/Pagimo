const express = require('express');
const admin = require('firebase-admin');
const fire = require('../api/fire');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/new-post', (req, res) => {
	res.render('newpost', { title: 'New Post' });
});

router.post('/new-post', (req, res, next) => {
	const { title, content, id } = req.body;
	console.log(JSON.stringify(req.body));
	fire.getUserId(id).then((user) => {
		fire.createPost(content, user, title).then((data) => {
			res.redirect(`/user/${user}`);
		}).catch((err) => {
			console.log(err);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		next(err);
	});
	/*
	admin.auth().getUser(id)
		.then((userRecord) => {
			console.log('User data: ', userRecord.toJSON());
			res.send(userRecord);
		}).catch((err) => {
			next(err);
			console.log(err);
		});
	console.log(id);
	*/
	// fire.getUser(id).then((user) => {
	// 	console.log(JSON.stringify(user));
	// });
});

module.exports = router;
