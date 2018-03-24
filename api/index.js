const fire = require('./fire');

fire.getUser('user_id').then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
});
