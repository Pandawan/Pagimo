const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.render('creators', {
		title: 'Express'
	});
});

module.exports = router;
