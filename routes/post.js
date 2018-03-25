const express = require('express');
const admin = require('firebase-admin');
const fire = require('../api/fire');
const config = require('../config');

const router = express.Router();

/* GET users listing. */
router.get('/new-post', (req, res) => {
	res.render('newpost', { title: 'New Post' });
});

router.post('/new-post', (req, res) => {
	const { title, content, id } = req.body;
	admin.auth().getUser(id)
		.then((userRecord) => {
			console.log('User data: ', userRecord.toJSON());
		}).catch((err) => {
			console.log(err);
		});
	console.log(id);
	// fire.getUser(id).then((user) => {
	// 	console.log(JSON.stringify(user));
	// });
});

module.exports = router;
