const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
	res.render('user', {
		title: 'Express'
	});
});

module.exports = router;
