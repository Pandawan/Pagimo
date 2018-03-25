const express = require('express');
const fire = require('../api/fire');

const router = express.Router();

// Create users
router.post('/create_user/', (req, res, next) => {
	const { uid, name, username } = req.body;
	fire.createUser(uid, name, username).then(() => {
		res.send('Success!');
	}).catch((err) => {
		console.log(err);
		res.send(`Something went wrong... ${err}`);
		next(err);
	});
});

router.post('/deposit/', (req, res, next) => {
	const { tokens, uid } = req.body;
	fire.getUserId(uid).then((user) => {
		fire.deposit(user, tokens).then(() => {
			res.send('Success!');
		}).catch((err) => {
			console.log(err);
			res.send(`Something went wrong... ${err}`);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		res.send(`Something went wrong... ${err}`);
		next(err);
	});
});

router.post('/withdraw/', (req, res, next) => {
	const { tokens, uid } = req.body;
	fire.getUserId(uid).then((user) => {
		fire.withdraw(user, tokens).then(() => {
			res.send('Success!');
		}).catch((err) => {
			console.log(err);
			res.send(`Something went wrong... ${err}`);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		res.send(`Something went wrong... ${err}`);
		next(err);
	});
});


router.post('/token/', (req, res, next) => {
	const { uid } = req.body;
	fire.getUserId(uid).then((id) => {
		fire.getUser(id).then((user) => {
			res.send(user);
		}).catch((err) => {
			console.log(err);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		next(err);
	});
});

router.post('/sell/', (req, res, next) => {
	const {
		investorId,
		channelId,
		minPrice,
		shareCount
	} = req.body;
	fire.getUserId(investorId).then((userId) => {
		fire.postSell(userId, channelId, minPrice, shareCount).then(() => {
			res.send('Success!');
		}).catch((err) => {
			console.log(err);
			res.send(`Something went wrong... ${err}`);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		res.send(`Something went wrong... ${err}`);
		next(err);
	});
});

router.post('/buy/', (req, res, next) => {
	const {
		investorId,
		channelId,
		askPrice,
		shareCount
	} = req.body;
	fire.getUserId(investorId).then((userId) => {
		fire.postBuy(userId, channelId, askPrice, shareCount).then(() => {
			res.send('Success!');
		}).catch((err) => {
			console.log(err);
			res.send(`Something went wrong... ${err}`);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		res.send(`Something went wrong... ${err}`);
		next(err);
	});
});

module.exports = router;
