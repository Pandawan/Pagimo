const fire = require('./fire');

fire.postSell('miguel-tenant', 'miguel', 10, 1).then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
});
