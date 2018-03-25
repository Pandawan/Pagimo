const fire = require('./fire');

fire.createUser('uuid', 'Miguel').then(() => {
	fire.getUser('miguel').then((data) => {
		console.log(data);
		fire.getUserId(data.uid).then((userId) => {
			console.log(userId);
		}).catch((err) => {
			console.log(err);
		});
	}).catch((err) => {
		console.log(err);
	});
}).catch((err) => {
	console.log(err);
});

postSell(''asdasdas).then((data) => { console.log(data);}).catch((err) => { console.log(err)});