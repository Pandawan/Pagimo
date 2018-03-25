const express = require('express');
const fire = require('../api/fire');

const router = express.Router();

// Create users
router.post('/create_user/', (req, res) => {
	const { uid, name, username } = req.body;
	fire.createUser(uid, name, username).then(() => {
		res.send('Success!');
	}).catch((err) => {
		res.send(`Something went wrong... ${err}`);
	});
});

router.post('/deposit/', (req, res) => {
	const { tokens, uid } = req.body;
	fire.getUserId(uid).then((user) => {
		fire.deposit(user, tokens).then(() => {
			res.send('Success!');
		}).catch((err) => {
			res.send(`Something went wrong... ${err}`);
		});
	}).catch((err) => {
		res.send(`Something went wrong... ${err}`);
	});
});

router.post('/withdraw/', (req, res) => {
	const { tokens, uid } = req.body;
	fire.getUserId(uid).then((user) => {
		fire.withdraw(user, tokens).then(() => {
			res.send('Success!');
		}).catch((err) => {
			res.send(`Something went wrong... ${err}`);
		});
	}).catch((err) => {
		res.send(`Something went wrong... ${err}`);
	});
});


router.post('/token/', (req, res, next) => {
	const { uid } = req.body;
	fire.getUserId(uid).then((id) => {
		fire.getUser(id).then((user) => {
			res.send(user);
		}).catch((err) => {
			next(err);
		});
	}).catch((err) => {
		next(err);
	});
});

router.post('/sell/', (req, res) => {
	const {
		investorId,
		channelId,
		minPrice,
		shareCount
	} = req.body;
	fire.postSell(investorId, channelId, minPrice, shareCount).then(() => {
		res.send('Success!');
	}).catch((err) => {
		res.send(`Something went wrong... ${err}`);
	});
});

router.post('/buy/', (req, res) => {
	const {
		investorId,
		channelId,
		askPrice,
		shareCount
	} = req.body;
	fire.postBuy(investorId, channelId, askPrice, shareCount).then(() => {
		res.send('Success!');
	}).catch((err) => {
		res.send(`Something went wrong... ${err}`);
	});
});

module.exports = router;
