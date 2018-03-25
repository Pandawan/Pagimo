const fire = require('./fire');

fire.getUserList('uuid').then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
});
